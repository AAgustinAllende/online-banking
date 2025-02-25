import React from 'react'
import Form from "./Form"
import Caracteristicas from './Caracteristicas'
import Footer from './Footer'

const Inicio = ({setUser}) => {
    return (
        <>
        <div>
            <header>
                <ul className="nav justify-content-center nav-underline navbar">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Mi cuenta</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contacto</a>
                    </li>
                </ul>
            </header>
           
        </div>
        <Form setUser={setUser}/>
        <Caracteristicas/>
        <Footer/>
        </>
    )
}

export default Inicio