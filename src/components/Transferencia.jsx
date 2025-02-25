import React, { useState } from 'react'
import Navbar from './Navbar'

const Transferencia = ({ user, setUser,
    saldoDisponible, setSaldoDisponible,
    setMovimientos }) => {

        const [userIdBanco] = useState(Math.floor(Math.random() * 1000000000));
    

    const [alias, setAlias] = useState("")
    const [montoIngresado,setMontoIngresado]=useState(0)

    const handleTransfer = () => {

        const monto=parseFloat(montoIngresado)

        if(monto <= 0){
            alert("Ingrese un monto válido")
            return;
        }

        if (montoIngresado > saldoDisponible) {
            alert("Saldo insuficiente")
            return;
        } 

        const nuevoMonto = saldoDisponible - montoIngresado;

        setSaldoDisponible(nuevoMonto);
        localStorage.setItem('saldoDisponible', nuevoMonto);

        const nuevoMovimiento = `Transferencia realizada - $${montoIngresado}`;
        setMovimientos(prevMovs => [...prevMovs, nuevoMovimiento]);

        alert("Transferencia realizada exitosamente!!");
        setMontoIngresado(0);

    }



    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <section className='transferencia-container'>
                <p>Ingresa el CBU,CVU o Alias</p>
                <input className='transferenciaInput' type="text"
                    onChange={(e) => setAlias(e.target.value)} />

                <button type="button" className="btn btn-info btn-transfer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Continuar
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h6>Alias: {alias}</h6>
                                <h6>Cta Nro.:{userIdBanco}</h6>
                                <input style={{ border: "none", borderBottom: "2px solid teal" }}
                                    type="text"
                                    value={montoIngresado}
                                    onChange={(e) => setMontoIngresado(e.target.value)}
                                    />
                                <p>Saldo disponible: ${saldoDisponible}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary"
                                    onClick={handleTransfer}>Transferir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Transferencia