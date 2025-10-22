import React from "react";
import styles from "./StatsModal.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function aggregateData(raw) {
  const flat = [];
  if (!raw) return flat;

  function walk(node, parentKey = null) {
    if (Array.isArray(node)) {
      node.forEach((item) => {
        if (parentKey && /^\d{4}-\d{2}-\d{2}$/.test(parentKey)) {
          flat.push({ ...item, _dateKey: parentKey });
        } else {
          flat.push(item);
        }
      });
    } else if (node && typeof node === "object") {
      Object.entries(node).forEach(([k, v]) => walk(v, k));
    }
  }

  walk(raw, null);
  return flat;
}

function getDateKeyFromRecord(r) {
  if (r && r._dateKey && /^\d{4}-\d{2}-\d{2}$/.test(r._dateKey)) return r._dateKey;

  if (r && r.timestamp) {
    const d = new Date(r.timestamp);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  if (r && r.data) {
    const maybe = String(r.data).trim();
    const parsed = new Date(maybe);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
    const parts = maybe.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (parts) {
      const d = parts[1].padStart(2, "0");
      const m = parts[2].padStart(2, "0");
      const y = parts[3].length === 2 ? `20${parts[3]}` : parts[3];
      return `${y}-${m}-${d}`;
    }
  }

  return "unknown";
}

function parseNumberLike(v) {
  if (v === undefined || v === null) return 0;
  const str = String(v).replace(",", ".").trim();
  const n = parseFloat(str);
  return Number.isNaN(n) ? 0 : n;
}

function groupByDateAggregate(records) {
  const map = new Map();
  records.forEach((r) => {
    const key = getDateKeyFromRecord(r);
    const viagensVal = parseNumberLike(r.viagensDia ?? r.viagens ?? r.viagens_por_dia);
    const esperaVal = parseNumberLike(r.tempoEspera ?? r.tempo ?? r.waitTime);

    const item = map.get(key) || { viagensSum: 0, esperaSum: 0, esperaCount: 0 };
    item.viagensSum += viagensVal;
    if (!Number.isNaN(esperaVal) && esperaVal !== 0) {
      item.esperaSum += esperaVal;
      item.esperaCount += 1;
    }
    map.set(key, item);
  });

  const entries = Array.from(map.entries());
  entries.sort((a, b) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(a[0]) && /^\d{4}-\d{2}-\d{2}$/.test(b[0])) {
      return a[0].localeCompare(b[0]);
    }
    return a[0].localeCompare(b[0]);
  });

  const labels = entries.map(([k]) => {
    if (k === "unknown") return "Sem data";
    const [y, m, d] = k.split("-");
    return `${d}/${m}/${y}`;
  });

  const viagensValues = entries.map(([, v]) => v.viagensSum);
  const esperaValues = entries.map(([, v]) => (v.esperaCount ? v.esperaSum / v.esperaCount : 0));

  return { labels, viagensValues, esperaValues };
}

export default function StatsModal({ onClose, storageKey = null }) {
  const css =
    typeof window !== "undefined" && window.getComputedStyle
      ? getComputedStyle(document.documentElement)
      : null;
  const primaryColor = css ? css.getPropertyValue("--primary").trim() || "#041E42" : "#041E42";
  const accentColor = css ? css.getPropertyValue("--accent").trim() || "#EF3270" : "#EF3270";

  let raw = null;
  if (storageKey) {
    raw = JSON.parse(localStorage.getItem(storageKey) || "null");
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const val = JSON.parse(localStorage.getItem(key));
        const flat = aggregateData(val);
        if (flat.length && (flat[0].viagensDia !== undefined || flat[0].tempoEspera !== undefined || flat[0].viagens !== undefined)) {
          raw = val;
          break;
        }
      } catch (e) {}
    }
  }

  const records = aggregateData(raw);
  const { labels, viagensValues, esperaValues } = groupByDateAggregate(records);

  const maxViagensValue = Math.max(...viagensValues, 10);
  const yMaxViagens = maxViagensValue <= 10 ? 10 : Math.ceil(maxViagensValue);

  const viagensData = {
    labels,
    datasets: [
      {
        label: "Viagens por Dia",
        data: viagensValues,
        backgroundColor: primaryColor || "#041E42",
        borderColor: primaryColor || "#041E42",
        borderWidth: 1,
      },
    ],
  };

  const viagensOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Viagens por Dia" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Data" },
        ticks: { maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Quantidade" },
        beginAtZero: true,
        max: yMaxViagens,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };

  const maxEsperaValue = Math.max(...esperaValues, 1);
  const yMaxEspera = Math.ceil(maxEsperaValue);

  const esperaData = {
    labels,
    datasets: [
      {
        label: "Tempo de Espera (min)",
        data: esperaValues,
        backgroundColor: accentColor || "#EF3270",
        borderColor: accentColor || "#EF3270",
        borderWidth: 1,
      },
    ],
  };

  const esperaOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Tempo de Espera" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const val = context.parsed.y;
            return `${val} min`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Data" },
        ticks: { maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Tempo (min)" },
        beginAtZero: true,
        max: yMaxEspera,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? `${value} min` : null;
          },
        },
      },
    },
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Estatísticas</h3>
          <button className={styles.close} onClick={onClose}>×</button>
        </div>

        <div className={styles.charts}>
          <div className={styles.chartBox}>
            <Bar data={viagensData} options={viagensOptions} />
          </div>

          <div className={styles.chartBox}>
            <Bar data={esperaData} options={esperaOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}