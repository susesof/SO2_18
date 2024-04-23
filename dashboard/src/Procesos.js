import React from 'react';

function Procesos({ procesos }) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Nombre</th>
                        <th>Tamaño</th>
                        <th>Memoria</th> {/* This column is only to be included if you are sure you have such data */}
                    </tr>
                </thead>
                <tbody>
                    {procesos.map((proceso) => (
                        <tr key={proceso.pid}>
                            <td>{proceso.pid}</td>
                            <td>{proceso.nombre}</td>
                            <td>{proceso.tamano} MB</td>
                            {/* Add the following line only if 'memoria' data is available
                            <td>{proceso.memoria}</td>
                            */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Procesos;
