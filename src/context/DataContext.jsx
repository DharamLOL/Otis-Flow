import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

const DADOS_INICIAIS = {
  contratos: [
    { id: 1, shopping: 'Iguatemi', vigencia: '03/28' },
    { id: 2, shopping: 'Ibirapuera', vigencia: '07/30' },
    { id: 3, shopping: 'Shopping Cidade São Paulo', vigencia: '01/25' },
  ],
  eventos: [
    { id: 101, contratoId: 1, nome: 'Serviços em Shopping Iguatemi', prioridade: 'ALTA', dias: '15 Dias', progresso: 40, status: 'emProgresso' },
    { id: 102, contratoId: 2, nome: 'Serviços em Shopping Ibirapuera', prioridade: 'BAIXA', dias: '...', progresso: 0, status: 'pendentes' },
    { id: 103, contratoId: 3, nome: 'Serviços em Shopping Cidade São Paulo', prioridade: 'MÉDIA', dias: 'Indefinido', progresso: 70, status: 'emPausa' },
  ]
};

export const DataProvider = ({ children }) => {
  const [contratos, setContratos] = useState(DADOS_INICIAIS.contratos);
  const [eventos, setEventos] = useState(DADOS_INICIAIS.eventos);

  const addContrato = (novoContratoData) => {
    const novoContrato = {
      id: Date.now(),
      ...novoContratoData,
    };

    const novoEvento = {
      id: Date.now() + 1,
      contratoId: novoContrato.id,
      nome: `Serviços em Shopping ${novoContrato.shopping}`,
      prioridade: 'BAIXA',
      dias: '...',
      progresso: 0,
      status: 'pendentes',
    };

    setContratos(listaAtual => [novoContrato, ...listaAtual]);
    setEventos(listaAtual => [novoEvento, ...listaAtual]);

    return novoContrato.id;
  };

  const value = {
    contratos,
    eventos,
    addContrato,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  return useContext(DataContext);
};