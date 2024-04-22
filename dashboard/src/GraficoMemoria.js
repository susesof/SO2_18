// GraficoMemoria.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficoMemoria = ({ datos }) => {
 
  const memoriaPorProceso = datos.map(proceso => proceso.tamano);
  const labels = datos.map(proceso => proceso.nombre);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Memoria por Proceso',
        data: memoriaPorProceso,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        
        ],
        hoverOffset: 4
      }
    ]
  };

  return <Pie data={data} />;
};

export default GraficoMemoria;
