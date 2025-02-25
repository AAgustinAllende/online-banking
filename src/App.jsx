import { useState, useEffect, use } from 'react';
import './App.css';
import Form from './components/Form';
import Perfil from './components/Perfil';
import Dolars from './components/Dolars';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Servicios from './components/Servicios';
import Transferencia from './components/Transferencia';
import Gastos from './components/Gastos';
import Tarjeta from './components/Tarjeta';
import Inicio from './components/Inicio'

function App() {
  const [user, setUser] = useState(null);
  const [saldoDisponible, setSaldoDisponible] = useState(() => {
    return parseFloat(localStorage.getItem('saldoDisponible')) || 0;
  });
  const [movimientos, setMovimientos] = useState(()=> {
    return JSON.parse(localStorage.getItem('movimientos')) || []
  })

  //Almacena el saldo el localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('saldoDisponible', saldoDisponible);
  }, [saldoDisponible]);

  useEffect(() => {
    localStorage.setItem('movimientos', JSON.stringify(movimientos))
  }, [movimientos])

  return (
    <BrowserRouter>
      {!user ? (
        <Inicio setUser={setUser} />
      ) : (
        <Routes>
          <Route
            path="/perfil"
            element={<Perfil
              user={user}
              setUser={setUser}
              saldoDisponible={saldoDisponible}
              setSaldoDisponible={setSaldoDisponible}
              movimientos={movimientos}
            />}
          />
          <Route
            path="/tarjetas"
            element={<Tarjeta
              user={user}
              setUser={setUser}
              saldoDisponible={saldoDisponible}
              setSaldoDisponible={setSaldoDisponible}
              movimientos={movimientos}
            />}
            />
          <Route path="/gastos" element={<Gastos movimientos={movimientos} />}
          />
          <Route
            path="/transferencias"
            element={<Transferencia
              user={user}
              setUser={setUser}
              saldoDisponible={saldoDisponible}
              setSaldoDisponible={setSaldoDisponible}
              movimientos={movimientos}
              setMovimientos={setMovimientos}
            />}
          />
          <Route
            path="/dolares"
            element={<Dolars
              user={user}
              setUser={setUser}
              saldoDisponible={saldoDisponible}
              setSaldoDisponible={setSaldoDisponible}
              movimientos={movimientos}
              setMovimientos={setMovimientos}
            />}
          />
          <Route
            path="/servicios"
            element={<Servicios
              user={user}
              setUser={setUser}
              saldoDisponible={saldoDisponible}
              setSaldoDisponible={setSaldoDisponible}
              setMovimientos={setMovimientos}
            />}
          />
          <Route path="*" element={<Navigate to="/perfil" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
