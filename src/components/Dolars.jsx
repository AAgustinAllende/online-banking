import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Dolars = ({ user, setUser, saldoDisponible, setSaldoDisponible, movimientos, setMovimientos }) => {
    const [cotizacion, setCotizacion] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    const [montoIngresado, setMontoIngresado] = useState(0);
    const dolarTotal = cotizacion * montoIngresado;

    useEffect(() => {
        const fetchCotizacion = async () => {
            try {
                const response = await fetch("https://dolarapi.com/v1/dolares/blue");
                const data = await response.json();
                setCotizacion(data.venta);
            } catch (error) {
                console.error("Error al obtener la cotización: ", error);
            }
        };

        fetchCotizacion();
    }, []);

    function comprarDolares(e) {
    e.preventDefault();
    
    if (montoIngresado <= 0 || isNaN(montoIngresado)) {
        setMensajeError("Ingrese un monto válido");
        return;
    }

    const nuevoSaldo = saldoDisponible - dolarTotal;
    console.log("Saldo actual:", saldoDisponible, "Total a restar:", dolarTotal, "Nuevo saldo:", nuevoSaldo);

    if (nuevoSaldo < 0) {
        setMensajeError("El dinero no es suficiente");
    } else {
        setMensajeError("");
        setSaldoDisponible(nuevoSaldo);
        localStorage.setItem('saldoDisponible', nuevoSaldo);
        setMovimientos(prevMovs => [...prevMovs, `Compraste ${montoIngresado} USD  - ${dolarTotal}`])
        alert("Compra realizada con éxito");
        setMontoIngresado(0);
    }
}


    return (
        <div className='dolars'>
            <Navbar user={user} setUser={setUser} />
            <main>
                <form className="formulario-compraDolares" onSubmit={comprarDolares}>
                    <div id="cotizacion-dolar">
                        <h6>Dólar Blue: </h6>
                        {cotizacion ? <p>{cotizacion} ARS = 1 USD</p> : <p>Cargando...</p>}
                    </div>
                    <div className="compra-dolares">
                        <input
                            type="text"
                            placeholder="USD"
                            value={montoIngresado}
                            onChange={(e) => setMontoIngresado(parseFloat(e.target.value) || 0)}
                        />
                        <p>${dolarTotal.toFixed(2)}</p>
                        <p>Saldo disponible: <span id="saldoDisponible">${saldoDisponible.toFixed(2)}</span></p>
                        <button className="btn btn-success">Comprar</button>
                        {mensajeError && <p className='error'>{mensajeError}</p>}
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Dolars;
