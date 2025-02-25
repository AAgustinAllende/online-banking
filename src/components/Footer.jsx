import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="footer-container">
                <div className="personas">
                    <h4>Potenciá tu plata</h4>
                    <p>Cuenta digital</p>
                    <p>Transferencias</p>
                    <p>Rendimientos</p>
                    <p>Préstamos</p>
                    <p>Tarjetas</p>
                </div>

                <div className="acerca-de">
                    <h4>Acerca de</h4>
                    <p>Ayuda</p>
                    <p>Términos y políticas</p>
                    <p>Blog</p>
                    <p>Costos y comisiones</p>
                    <p>Ley 24.240 de Defensa del Cosumidor</p>
                    <p>FAQs</p>
                </div>

                <div className="redes-sociales">
                    <h4>Seguinos</h4>
                    <article className="redes-icon">
                        <img src="./img/logotipo-de-instagram (1).png" alt="" />
                        <img src="./img/gorjeo.png" alt="" />
                        <img src="./img/logo-de-facebook.png" alt="" />
                    </article>
                </div>
            </footer>
        </div>
    )
}

export default Footer