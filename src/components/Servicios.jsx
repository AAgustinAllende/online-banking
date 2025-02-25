import React from 'react';
import Navbar from './Navbar';
import serviciosData from '../data/servicios.json';

const Servicios = ({ user, setUser, saldoDisponible, setSaldoDisponible, movimientos, setMovimientos }) => {
    const id = Math.floor(Math.random() * 1000000); 

    function pagarServicios(nombre, monto) {
        const saldoActual = parseFloat(saldoDisponible) || 0; 

        if (saldoActual >= monto) {
            const nuevoSaldo = saldoActual - monto;
            
            setSaldoDisponible(nuevoSaldo);
            localStorage.setItem('saldoDisponible', nuevoSaldo); // Guardar saldo actualizado

            setMovimientos(prevMovs => [...prevMovs, `Pagaste ${nombre} - $${monto}`]);

            alert("Pago realizado exitosamente");
        } else {
            alert("Saldo insuficiente");
        }
    }

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            
            {serviciosData.map((item, index) => (
                <div key={index}>
                    <button type="button" className="btn btn-light btn-services" data-bs-toggle="modal" data-bs-target={`#modal-${index}`}>
                        <img style={{ width: "50px", height: "auto" }} src={item.img} alt="" />
                        <p>{item.nombre}</p>
                    </button>

                    <div className="modal fade" id={`modal-${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`modal-label-${index}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id={`modal-label-${index}`}>{item.nombre}</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h4>Usuario {id}</h4>
                                    <p>{user}</p>
                                    <p>Vas a pagar ${item.monto_maximo}</p>
                                </div>
                                <div className="modal-footer">
                                    <p>Saldo disponible: ${saldoDisponible.toFixed(2)}</p>
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => pagarServicios(item.nombre, item.monto_maximo)}>Pagar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Servicios;
