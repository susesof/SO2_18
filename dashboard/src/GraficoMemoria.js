import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './GraficoMemoria.css';

const GraficoMemoria = ({ datos }) => {
  // Verificar si 'datos' es un array y tiene contenido.
  if (!Array.isArray(datos) || datos.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }
  
  // Reduce el array a un objeto que contiene la suma de 'tamano' por cada 'nombre' de proceso
  const memoriaPorProceso = datos.reduce((acc, proceso) => {
    const tamano = parseFloat(proceso.tamano); // Convierte 'tamano' a número
    if (!isNaN(tamano)) { // Asegúrate de que 'tamano' es un número válido
      if (acc[proceso.nombre]) {
        acc[proceso.nombre] += tamano; // Suma al acumulado existente
      } else {
        acc[proceso.nombre] = tamano; // Inicializa con el valor actual
      }
    }
    return acc;
  }, {});

  // Extrae las etiquetas y los datos acumulados para el gráfico
  const labels = Object.keys(memoriaPorProceso);
  const dataMemoria = Object.values(memoriaPorProceso);

  // Configuración de datos para el gráfico de pastel
  const data = {
    labels,
    datasets: [
      {
        label: 'Memoria por Proceso',
        data: dataMemoria,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
