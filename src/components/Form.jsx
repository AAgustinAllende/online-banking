import React, { useState } from 'react';

const Form = ({setUser}) => {

  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if(nombre === "" || contraseña === ""){
      setError(true)
      return
    }
    setError(false)

    setUser(nombre)
  }

  

  return (
    <div>
      <section className="section-style">
        <div className="formulario-ingreso">
          <div className="contenedor">
            <div className="formulario">
              <form action="#" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>

                <div className="input-contenedor">
                  <img className="icon" src="../public/img/correo-electronico.png" alt="Icono correo" />
                  <input type="text" required 
                  value={nombre} 
                  onChange={e => setNombre(e.target.value)} />
                  <label htmlFor="#">Email</label>
                </div>

                <div className="input-contenedor">
                  <img className="icon" src="../public/img/cerrar-con-llave.png" alt="Icono llave" />
                  <input type="password" required
                  value={contraseña}
                  onChange={e=>setContraseña(e.target.value)} />
                  <label htmlFor="#">Contraseña</label>
                </div>

                <div className="olvidar">
                  <label htmlFor="#">
                    <input type="checkbox" /> Recordar
                  </label>
                  <a href="#">Olvidé la contraseña</a>
                </div>
                <div>
                <button type='submit'>Acceder</button>
              </div>
              </form>
              

              <div className="registrar">
                <p>No tengo cuenta <a href="#">Crear una</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
