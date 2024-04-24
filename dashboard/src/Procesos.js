import React from 'react';

function Procesos({ procesos }) {
    
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Nombre</th>
                        <th>Tamaño Total</th> {/* Actualizado para reflejar el tamaño total */}
                        {/* Quitar la columna de memoria si no tienes esos datos */}
                    </tr>
                </thead>
                <tbody>
                    {procesos.map((proceso) => (
                        <tr key={`${proceso.pid}`}> {/* Usar una combinación de pid y el índice para la clave */}
                            <td>{proceso.pid}</td>
                            <td>{proceso.process_name}</td> 
                            <td>{proceso.total_size} MB</td> 
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Procesos;
