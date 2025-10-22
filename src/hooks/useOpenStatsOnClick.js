import { useEffect } from "react";

const EVENT_NAME = "open-stats-modal";

export function emitOpenStats() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

export default function useOpenStatsOnClick() {
  useEffect(() => {
    const nodeList = Array.from(document.querySelectorAll("span"));
    const target = nodeList.find((s) =>
      s.textContent && s.textContent.trim().toLowerCase() === "ver todas as estatísticas"
    );

    function onClickHandler() {
      window.dispatchEvent(new Event(EVENT_NAME));
    }

    if (target) {
      target.addEventListener("click", onClickHandler);
    } else {
      const observer = new MutationObserver(() => {
        const nodeList2 = Array.from(document.querySelectorAll("span"));
        const t2 = nodeList2.find((s) =>
          s.textContent && s.textContent.trim().toLowerCase() === "ver todas as estatísticas"
        );
        if (t2) {
          t2.addEventListener("click", onClickHandler);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    return () => {
      if (target) target.removeEventListener("click", onClickHandler);
    };
  }, []);
}