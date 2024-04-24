import React from 'react';
import './Procesos.css';
function Procesos({ procesos }) {
    
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Nombre</th>
                        <th>Tamaño Total</th> 
                        
                    </tr>
                </thead>
                <tbody>
                    {procesos.map((proceso) => (
                        <tr key={`${proceso.pid}`}> 
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
