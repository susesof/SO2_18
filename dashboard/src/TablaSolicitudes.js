

import React from 'react';
import './TablaSolicitudes.css';

function TablaSolicitudes({ solicitudes }) {
  
   
  
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>PID</th>
              <th>Llamada</th>
              <th>Tamaño</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.pid}</td>
                <td>{solicitud.call_type}</td>
                <td>{solicitud.segment_size} MB</td> 
                <td>{solicitud.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TablaSolicitudes;
  