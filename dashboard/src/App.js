import React, { useState, useEffect } from 'react';
import TablaSolicitudes from './TablaSolicitudes';
import GraficoMemoria from './GraficoMemoria';
import Procesos from './Procesos';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [procesos, setProcesos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true); // Activar indicador de carga

      fetch('http://localhost:4000/api/ObtenerProcesos')
        .then(response => response.json())
        .then(data => {
          setProcesos(data);
          setLoading(false); // Desactivar indicador de carga cuando se completan las actualizaciones
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false); // Desactivar indicador de carga en caso de error
        });

      fetch('http://localhost:4000/api/ObtenerSolicitudes')
        .then(response => response.json())
        .then(data => {
          setSolicitudes(data);
          setLoading(false); // Desactivar indicador de carga cuando se completan las actualizaciones
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false); // Desactivar indicador de carga en caso de error
        });
    }, 3000); // Actualizar cada 2000 milisegundos (2 segundos)

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App container py-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      {loading && <p>Actualizando...</p>}
      {loading && <br />} 
      <div className="row">
        <div className="col-md-8">
         <GraficoMemoria datos={procesos} />
        </div>
        <div className="col-md-4">
          <h3>Procesos</h3>
          <Procesos procesos={procesos} />
        </div>
      </div>
      <div className="row mt-4">
        <h3>Solicitudes</h3>
        <div className="col-12">
          <TablaSolicitudes solicitudes={solicitudes} />
        </div>
      </div>
    </div>
  );
}

export default App;
