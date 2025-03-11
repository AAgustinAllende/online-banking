import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Gastos from './Gastos';
import Movimientos from './Movimientos';

const Perfil = ({ user, setUser, saldoDisponible, setSaldoDisponible, movimientos, setMovimientos }) => {
    const [mostrarSaldo, setMostrarSaldo] = useState(true);

    useEffect(() => {
        const saldoGuardado = localStorage.getItem('saldoDisponible');
        if (saldoGuardado !== null && saldoGuardado !== "NaN") {
            setSaldoDisponible(parseFloat(saldoGuardado));
        } else {
            pedirSaldo();
        }
    }, []);

    const pedirSaldo = () => {
        const confirmacion = window.confirm("¿Querés ingresar tu saldo inicial?");
        if (confirmacion) {
            const inputSaldo = window.prompt("Ingrese el dinero disponible en su cuenta");
            if (inputSaldo !== null && inputSaldo.trim() !== "" && !isNaN(inputSaldo)) {
                const saldoIngresado = parseFloat(inputSaldo);
                setSaldoDisponible(saldoIngresado);
                localStorage.setItem('saldoDisponible', saldoIngresado);
            } else {
                setSaldoDisponible(0);
                localStorage.setItem('saldoDisponible', 0);
            }
        }
    };

    const resetearSaldo = () => {
        localStorage.removeItem('saldoDisponible');
        setSaldoDisponible(0);
        pedirSaldo();
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            
            <main className="container-perfil">
                <div className="saldo">
                    <h2>${mostrarSaldo ? `${saldoDisponible.toFixed(2)}` : "****"}</h2>
                    <img 
                        src={mostrarSaldo ? "./img/ojo.png" : "./img/ojo-cerrado.png"} 
                        onClick={() => setMostrarSaldo(!mostrarSaldo)} 
                        alt="Toggle saldo"
                    />
                </div>

                <button onClick={resetearSaldo} className="btn-reset">Resetear Saldo</button>

                <div className="btn-home-banking">
                    <Link to="/transferencias">
                        <button className="btn1">
                            <img src="./img/transferencia-movil.png" alt="Transferencia"/>Transferir
                        </button>
                    </Link>
                    <button className="btn2"><img src="./img/ingreso.png" alt="Ingresar"/>Ingresar</button>
                    <button className="btn3"><img src="./img/tomar-prestado.png" alt="Préstamos"/>Préstamos</button>
                    <button className="btn4"><img src="./img/ganador.png" alt="Inversiones"/>Inversiones</button>
                </div>

                <section className="btn-opciones">
                    <Link to="/servicios">
                        <button>
                            <img src="./img/pago.png" alt="Servicios"/>Servicios
                        </button>
                    </Link>
                    <Link to="/dolares" id="btn-dolares">
                        <button className='btn-dolares'>
                            <img src="./img/dolares.png" alt="Dólares"/>Dólares
                        </button>
                    </Link>
                </section>

            </main>
            <Gastos movimientos={movimientos}/>
            <Movimientos movimientos={movimientos} setMovimientos={setMovimientos}/>
        </div>
    );
};

export default Perfil;
