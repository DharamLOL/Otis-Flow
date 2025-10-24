import { IoMdStats } from 'react-icons/io';
import { MdDescription } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import SearchBar from '../components/SearchBar';
import styles from '../css/ReportsDashboard.module.css';
import { useState, useEffect } from 'react';
import { useCache } from '../hooks/useCache';
import CreateReportModal from '../components/CreateReportModal';
import StatsModal from '../components/StatsModal';
import useOpenStatsOnClick from '../hooks/useOpenStatsOnClick';

const ReportCard = ({ title, value, trend, trendColor, trendIconName }) => {
    return (
        <div className={styles.reportCard}>
            <div>
                <div className={styles.cardHeader}>
                    <span className={styles.cardTitle}>{title}</span>
                    <MdDescription size={18} color="#f06292" className={styles.cardIcon} />
                </div>
                <div className={styles.cardValue}>{value}</div>
            </div>
            <div className={`${styles.cardTrend} ${styles[trendColor]}`}>
                <span style={{ marginRight: '5px' }}>{trendIconName}</span>
                {trend}
            </div>
        </div>
    );
};

const ReportsDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('shopping');
    const { addEntry } = useCache();

    // Controle do modal de estatísticas
    const [openStats, setOpenStats] = useState(false);
    useOpenStatsOnClick();

    useEffect(() => {
        function handler() { setOpenStats(true); }
        window.addEventListener('open-stats-modal', handler);
        return () => window.removeEventListener('open-stats-modal', handler);
    }, []);

    const locationsData = {
        shopping: {
            name: 'ELEVADOR SUL SHOPPING IGUATEMI',
            data: [
                {
                    month: '04 / 25',
                    cards: [
                        {
                            title: 'MÉDIA DIÁRIA DE PESSOAS',
                            value: '2.372',
                            trend: '25,32% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE ACIONAMENTOS DIÁRIOS',
                            value: '5.563',
                            trend: '23,52% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE PESSOAS SIMULTÂNEAS POR VIAGEM',
                            value: '3',
                            trend: '0% desde o mês passado',
                            trendColor: 'trendNeutral',
                            trendIconName: '—'
                        },
                    ]
                },
                {
                    month: '03 / 25',
                    cards: [
                        {
                            title: 'MÉDIA DIÁRIA DE PESSOAS',
                            value: '2.060',
                            trend: '6,29% desde o mês passado',
                            trendColor: 'trendNegative',
                            trendIconName: '▼'
                        },
                        {
                            title: 'MÉDIA DE ACIONAMENTOS DIÁRIOS',
                            value: '4.547',
                            trend: '13,72% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE PESSOAS SIMULTÂNEAS POR VIAGEM',
                            value: '3',
                            trend: '50% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                    ]
                }
            ]
        },
        hospital: {
            name: 'ELEVADOR HOSPITAL SÃO PAULO',
            data: [
                {
                    month: '04 / 25',
                    cards: [
                        {
                            title: 'MÉDIA DIÁRIA DE PESSOAS',
                            value: '1.850',
                            trend: '18,75% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE ACIONAMENTOS DIÁRIOS',
                            value: '3.200',
                            trend: '15,42% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE PESSOAS SIMULTÂNEAS POR VIAGEM',
                            value: '2',
                            trend: '0% desde o mês passado',
                            trendColor: 'trendNeutral',
                            trendIconName: '—'
                        },
                    ]
                },
                {
                    month: '03 / 25',
                    cards: [
                        {
                            title: 'MÉDIA DIÁRIA DE PESSOAS',
                            value: '1.558',
                            trend: '5,12% desde o mês passado',
                            trendColor: 'trendNegative',
                            trendIconName: '▼'
                        },
                        {
                            title: 'MÉDIA DE ACIONAMENTOS DIÁRIOS',
                            value: '2.772',
                            trend: '10,25% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE PESSOAS SIMULTÂNEAS POR VIAGEM',
                            value: '2',
                            trend: '33% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                    ]
                }
            ]
        },
        predio: {
            name: 'ELEVADOR PRÉDIO COMERCIAL CENTRO',
            data: [
                {
                    month: '04 / 25',
                    cards: [
                        {
                            title: 'MÉDIA DIÁRIA DE PESSOAS',
                            value: '890',
                            trend: '12,45% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE ACIONAMENTOS DIÁRIOS',
                            value: '1.245',
                            trend: '8,76% desde o mês passado',
                            trendColor: 'trendPositive',
                            trendIconName: '▲'
                        },
                        {
                            title: 'MÉDIA DE PESSOAS SIMULTÂNEAS POR VIAGEM',
                            value: '4',
                            trend: '0% desde o mês passado',
                            trendColor: 'trendNeutral',
                            trendIconName: '—'
                        },
                    ]
                }
            ]
        }
    };

    const currentLocation = locationsData[activeTab];
    const handleSaveReport = (fullReportData) => {
        const dataToSave = { ...fullReportData };
        const empresa = dataToSave.empresa;
        const dataISO = dataToSave.data;
        delete dataToSave.empresa;
        delete dataToSave.data;
        const payload = dataToSave;

        try {
            addEntry(empresa.trim(), dataISO, payload);

            alert('Relatório salvo com sucesso no cache!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Houve um erro ao salvar o relatório:', error);
            alert('Houve um erro ao salvar o relatório.');
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <ProfileHeader />
                <div className={styles.reportsSection}>
                    <h1 className={styles.reportsHeader}>Relatórios</h1>

                    <div className={styles.tabsContainer}>
                        <div className={styles.locationTabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'shopping' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('shopping')}
                            >
                                SHOPPING IGUATEMI
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'hospital' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('hospital')}
                            >
                                HOSPITAL SÃO PAULO
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'predio' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('predio')}
                            >
                                PRÉDIO COMERCIAL
                            </button>
                        </div>


                        <button
                            className={styles.tab}
                            onClick={() => setIsModalOpen(true)}
                        >
                            CRIAR RELATÓRIO
                        </button>
                    </div>

                    <div className={styles.reportTitleBar}>
                        <span>{currentLocation.name}</span>
                        <div className={styles.viewStats}>
                            <span>VER TODAS AS ESTATÍSTICAS</span>
                            <IoMdStats size={18} color="white" style={{ marginLeft: '5px' }} />
                        </div>
                    </div>

                    <div className={styles.monthsContainer}>
                        {currentLocation.data.map((monthData) => (
                            <div className={styles.monthRow} key={monthData.month}>
                                <div className={styles.monthLabel}>{monthData.month} →</div>
                                <div className={styles.cardsContainer}>
                                    {monthData.cards.map((card, index) => (
                                        <ReportCard
                                            key={index}
                                            title={card.title}
                                            value={card.value}
                                            trend={card.trend}
                                            trendColor={card.trendColor}
                                            trendIconName={card.trendIconName}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <CreateReportModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveReport}
                />
            )}

            {/* Modal de estatísticas com gráficos */}
            {openStats && <StatsModal onClose={() => setOpenStats(false)} />}
        </div>
    );
};

export default ReportsDashboard;