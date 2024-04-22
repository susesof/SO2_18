// TablaSolicitudes.js
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
                <tr key={solicitud.id_proceso}>
                <td>{solicitud.pid}</td>
                <td>{solicitud.llamada}</td>
                <td>{solicitud.tamano}MB</td> {/* Asumiendo que el tamaño es en MB */}
                <td>{new Date(solicitud.fecha).toLocaleString()}</td> {/* Formateando la fecha */}
                </tr>
            ))}
            </tbody>
      </table>
    </div>
    );
  }
  
  export default TablaSolicitudes;
  