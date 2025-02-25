import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({user,setUser}) => {
    const navigate=useNavigate()

    const handleLogout=()=>{
        setUser(null)
        navigate("/")
    }

  return (
    <div>
        <header className="header">
        <nav>
            <div className="sidebar">
                <h2>Menú</h2>
                <a href="#">{user || "Usuario"}</a>
                <Link to="/perfil">Perfil</Link>
                <a href="#">Notificaciones</a>
                <Link to="/tarjetas">Tarjetas</Link>
                <a href="#">Préstamos</a>
                <a href="#">Beneficios</a>
                <a href="#">Soporte y Ayuda</a>
                <a href="#">Configuración</a>
                <hr/>
                <a href="#" onClick={handleLogout} >Cerrar sesión</a>
            </div>
        </nav>

    </header>
    </div>
  )
}

export default Navbar