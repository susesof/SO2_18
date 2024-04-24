// TablaSolicitudes.js
function TablaSolicitudes({ solicitudes }) {
    // Formatea la fecha para que se muestre de manera amigable
    const formatFecha = (timestamp) => {
      // Convierte el timestamp a un número y luego a una fecha
      const fecha = new Date(Number(timestamp));
      // Retorna la fecha en formato local
      return fecha.toLocaleString();
    };
  
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
                <td>{solicitud.segment_size} MB</td> {/* Asumiendo que el tamaño es en MB */}
                <td>{solicitud.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TablaSolicitudes;
  