import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './GraficoMemoria.css';

const GraficoMemoria = ({ datos }) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  const procesosOrdenados = [...datos].sort((a, b) => b.total_size - a.total_size);
  const topDiezProcesos = procesosOrdenados.slice(0, 10);
  const otrosProcesos = procesosOrdenados.slice(10);

  const otrosProcesosTotalSize = otrosProcesos.reduce((acc, proceso) => acc + proceso.total_size, 0);
  const otrosProcesosTotalPercent = otrosProcesos.reduce((acc, proceso) => acc + proceso.total_percent, 0);

  const labels = topDiezProcesos.map(proceso => proceso.process_name).concat('Otros');
  const memoriaPorProceso = topDiezProcesos.map(proceso => proceso.total_size).concat(otrosProcesosTotalSize);
  const porcentajePorProceso = topDiezProcesos.map(proceso => proceso.total_percent).concat(otrosProcesosTotalPercent);

  const data = {
    labels,
    datasets: [
      {
        label: 'Uso de memoria',
        data: memoriaPorProceso,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#949FB1', '#4D5360', '#AC64AD', '#65B7F3', '#FAE597', '#D3D3D3'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += `${context.parsed} MB`;
            }
            const percent = porcentajePorProceso[context.dataIndex];
            label += ` (${percent.toFixed(2)}%)`;
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="GraficoMemoria" style={{ width: '550px', height: '500px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoMemoria;
