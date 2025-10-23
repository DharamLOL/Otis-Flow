// ProdutosServicos.js - VERSÃO COM TODOS OS CONTEÚDOS E FUNCIONALIDADE DE CALENDÁRIO

import React, { useState } from 'react'; // <--- useState REINTRODUZIDO
import styles from '../css/ProdutoServicos.module.css'; // Principal CSS
import { IoMdStats } from 'react-icons/io';
import { MdDescription, MdEvent } from 'react-icons/md'; // Adicionado MdEvent para a lista de deadlines

// IMPORTS DOS COMPONENTES ESTÁTICOS
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import SearchBar from '../components/SearchBar';

// img
import profileImage from '../assets/amanda_silva.jpg';
import buildImage from '../assets/build.png'
// Mapeamento dos nomes dos meses (PODE FICAR FORA DO COMPONENTE)
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Componente principal
const ProdutosServicos = () => {

    // --- VARIÁVEL NECESSÁRIA PARA O CALENDÁRIO ---
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // ESTADO PARA O CALENDÁRIO
    const initialDate = new Date(2025, 7, 17); // Mês 7 é Agosto
    const [currentMonth, setCurrentMonth] = useState(initialDate);
    const [selectedDay, setSelectedDay] = useState(17); // Dia inicial selecionado

    // --- DADOS DO PROJETO E DEADLINES (Personalizados) ---
    const instalacaoData = [
        { name: 'Torre Central', status: 'Concluído', labelClass: styles.labelCompleted, deadlineDay: null, type: 'instalação' },
        { name: 'Ed. Harmony', status: 'Em instalação', labelClass: styles.labelInProgress, deadlineDay: 25, type: 'instalação' },
        { name: 'Complexo Alpha', status: 'Aguardando material', labelClass: styles.labelMaterial, deadlineDay: 5, type: 'instalação' },
        { name: 'Shopping Sul', status: 'Em processo', labelClass: styles.labelInProgress, deadlineDay: 19, type: 'instalação' },
        { name: 'Res. Primavera', status: 'Concluído', labelClass: styles.labelCompleted, deadlineDay: null, type: 'instalação' },
    ];
    const manutencaoData = [
        { name: 'Torre Prime', status: 'Concluído', labelClass: styles.labelCompleted, deadlineDay: null, type: 'manutenção' },
        { name: 'Ed. Meridian', status: 'Em andamento', labelClass: styles.labelInProgress, deadlineDay: 10, type: 'manutenção' },
        { name: 'Indústria Beta', status: 'Aguardando peças', labelClass: styles.labelPending, deadlineDay: 21, type: 'manutenção' },
        { name: 'Centro Saúde', status: 'Pendente', labelClass: styles.labelPending, deadlineDay: 30, type: 'manutenção' },
        { name: 'Hotel Vista', status: 'Concluído', labelClass: styles.labelCompleted, deadlineDay: null, type: 'manutenção' },
    ];

    // Lista de todas as deadlines ativas no mês atual
    const allDeadlines = [...instalacaoData, ...manutencaoData]
        .filter(item => item.deadlineDay !== null && item.status !== 'Concluído')
        .map(item => ({
            day: item.deadlineDay,
            project: item.name,
            type: item.type,
            status: item.status,
            description: `${item.name} - Deadline para ${item.status === 'Em instalação' || item.status === 'Em processo' || item.status === 'Em andamento' ? 'término' : 'envio de material/peças'} da ${item.type}`,
        }));

    // Funções de navegação do calendário
    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        setSelectedDay(1);
    };
    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        setSelectedDay(1);
    };
    const handleDayClick = (day) => {
        if (day !== null) {
            setSelectedDay(day);
        }
    };

    // --- LÓGICA DO CALENDÁRIO ---
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo, 6 = Sábado
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null); // Células vazias
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i); // Dias do mês
    }

    // Deadlines para o dia selecionado
    const deadlinesForSelectedDay = allDeadlines.filter(dl => dl.day === selectedDay);


    // Dados para o Catálogo de Produtos (Personalizados)
    const productsData = [
        {
            title: 'SkyRise - Elevador de Alto Tráfego',
            description: 'Tipo: Elevador comercial, de alto fluxo. Aplicação: Edifícios muito altos e movimentados. Capacidade: até 2000 kg ou 25 passageiros. Velocidade: até 5.0 m/s.',
        },
        {
            title: 'Elevators Plus - Solução Moderna',
            description: 'Tipo: Elevador residencial e comercial leve. Aplicação: Edifícios de médio porte. Capacidade: até 1000 kg ou 13 passageiros. Velocidade: até 2.9 m/s. Certificações: ISO 9001.',
        },
        {
            title: 'Elevators Premium - Luxo e Eficiência',
            description: 'Tipo: Elevador de uso hospitalar e de luxo. Aplicação: Hospitais e hotéis de alto padrão. Características: Cabine silenciosa, portas mais largas e alta precisão de parada.',
        },
        {
            title: 'Elevators Basic - Solução Econômica',
            description: 'Tipo: Elevador de serviço básico. Aplicação: Prédios mais antigos ou de baixo tráfego. Capacidade: até 500 kg ou 7 passageiros. Ideal para modernização.',
        },
    ];


    return (
        <div className={styles.container}>

            <Sidebar />

            <div className={styles.mainContent}>

                <ProfileHeader />

                <div className={styles.dashboardContainer}>
                    {/* TÍTULO DA PÁGINA: MAPA DE PROJETOS */}
                    <div className={styles.pageHeader}>
                        <h1 className={styles.mainTitle}>Mapa de projetos</h1>
                        <span className={styles.breadcrumb}>Home &gt; Dashboard</span>
                    </div>

                    {/* Barra de Ações (Adicionar e Filtros) */}
                    <div className={styles.actionsBar}>
                        <button className={`${styles.actionButton} ${styles.addButton}`}>
                            + Adicionar novo evento
                        </button>
                        <button className={`${styles.actionButton} ${styles.filterButton}`}>
                            Filtros
                        </button>
                    </div>

                    {/* Layout Principal do Dashboard (GRID) */}
                    <div className={styles.dashboardGrid}>
                        {/* COLUNA ESQUERDA */}
                        <div className={styles.leftColumn}>

                            {/* Cards Instalação e Manutenção */}
                            <div className={styles.topCards}>

                                {/* Card Instalação */}
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>Instalação <IoMdStats style={{ color: '#e74c3c' }} /></div>
                                    <ul className={styles.statusList}>
                                        {instalacaoData.map((item, index) => (
                                            <li key={index} className={styles.statusItem}>
                                                <div className={styles.itemDetail}>
                                                      <img src={profileImage} alt="Amanda Silva" className={styles.avatar} />
                                                    <span className={styles.itemName}>{item.name}</span>
                                                </div>
                                                <span className={`${styles.itemLabel} ${item.labelClass}`}>{item.status}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card Manutenção */}
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>Manutenção <MdDescription style={{ color: '#3498db' }} /></div>
                                    <ul className={styles.statusList}>
                                        {manutencaoData.map((item, index) => (
                                            <li key={index} className={styles.statusItem}>
                                                <div className={styles.itemDetail}>
                                                      <img src={profileImage} alt="Amanda Silva" className={styles.avatar} />
                                                    <span className={styles.itemName}>{item.name}</span>
                                                </div>
                                                <span className={`${styles.itemLabel} ${item.labelClass}`}>{item.status}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Card Catálogo de Produtos */}
                            <div className={`${styles.card} ${styles.productsCard}`}>
                                <div className={styles.cardHeader}>Catálogo de produtos</div>

                                {productsData.map((product, index) => (
                                    <div key={index} className={styles.productItem}>
                                        <img src={buildImage} alt="Amanda Silva" className={styles.profileImage} />
                                        <div className={styles.productContent}>
                                            <h3 className={styles.productTitle}>{product.title}</h3>
                                            <p className={styles.productDescription}>
                                                {product.description}
                                            </p>
                                            <div className={styles.productButtons}>
                                                <button className={`${styles.productButton} ${styles.visitSiteButton}`}>Visitar site</button>
                                                <button className={`${styles.productButton} ${styles.viewDetailsButton}`}>Ver detalhes</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* COLUNA DIREITA (Eventos/Calendário/Deadlines) */}
                        <div className={styles.rightColumn}>
                            <div className={`${styles.card} ${styles.eventsCard}`}>
                                <div className={styles.cardHeader}>Eventos</div>

                                {/* Calendário Dinâmico */}
                                <div className={styles.calendar}>
                                    <div className={styles.calendarHeader}>
                                        <div className={styles.monthNav} onClick={handlePrevMonth}>&lt;</div>
                                        <span>{monthNames[month]} {year}</span>
                                        <div className={styles.monthNav} onClick={handleNextMonth}>&gt;</div>
                                    </div>
                                    <div className={styles.calendarGrid}>
                                        {/* Renderiza os Dias da Semana */}
                                        {daysOfWeek.map(day => <div key={day} className={styles.dayHeader}>{day}</div>)}
                                        {calendarDays.map((day, index) => {
                                            const isDeadlineDay = allDeadlines.some(dl => dl.day === day);
                                            const isSelected = day === selectedDay;

                                            return (
                                                <div
                                                    key={index}
                                                    className={day === null ? styles.emptyCell : styles.dayCell}
                                                    onClick={() => handleDayClick(day)}
                                                >
                                                    {day !== null && (
                                                        <span className={`${isSelected ? styles.selectedDay : ''} ${isDeadlineDay && !isSelected ? styles.deadlineDay : ''}`}>
                                                            {day}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />

                                {/* LISTA DE DEADLINES PARA O DIA SELECIONADO */}
                                <h3 style={{ fontSize: '16px', color: '#2c3e50', marginBottom: '10px' }}>
                                    Deadlines para {selectedDay} de {monthNames[month]}
                                </h3>
                                {deadlinesForSelectedDay.length > 0 ? (
                                    <ul className={styles.statusList}>
                                        {deadlinesForSelectedDay.map((dl, index) => (
                                            <li key={index} className={styles.statusItem} style={{ padding: '10px 0' }}>
                                                <div className={styles.itemDetail}>
                                                    <MdEvent style={{ color: '#e74c3c', marginRight: '10px' }} />
                                                    <span className={styles.itemName} style={{ lineHeight: '1.4' }}>{dl.description}</span>
                                                </div>
                                                <span className={`${styles.itemLabel} ${dl.type === 'instalação' ? styles.labelInProgress : styles.labelPending}`}>
                                                    {dl.type.charAt(0).toUpperCase() + dl.type.slice(1)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ fontSize: '14px', color: '#999' }}>Nenhuma deadline de projeto para este dia.</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutosServicos;