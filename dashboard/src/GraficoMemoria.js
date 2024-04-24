import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './GraficoMemoria.css';

const GraficoMemoria = ({ datos }) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  // Ordena los datos por 'total_size' en orden descendente
  const procesosOrdenados = [...datos].sort((a, b) => b.total_size - a.total_size);

  // Selecciona los primeros 10 para mostrar en la gráfica
  const topDiezProcesos = procesosOrdenados.slice(0, 10);

  // Suma el tamaño de todos los demás procesos
  const otrosProcesosTotalSize = procesosOrdenados.slice(10)
    .reduce((acc, proceso) => acc + proceso.total_size, 0);

  // Agrega la suma de los demás procesos como una categoría adicional en el gráfico
  const labels = topDiezProcesos.map(proceso => proceso.process_name).concat('Otros');
  const memoriaPorProceso = topDiezProcesos.map(proceso => proceso.total_size).concat(otrosProcesosTotalSize);

  // Configuración de datos para el gráfico de pastel
  const data = {
    labels,
    datasets: [
      {
        label: 'Memoria por Proceso',
        data: memoriaPorProceso,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#949FB1', '#4D5360', '#AC64AD', '#65B7F3', '#FAE597', '#D3D3D3' // Color adicional para "Otros"
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="GraficoMemoria" style={{ width: '550px', height: '500px' }}>
      <Pie data={data} />
    </div>
  );
};

export default GraficoMemoria;
