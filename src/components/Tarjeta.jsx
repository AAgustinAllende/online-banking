import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import Navbar from './Navbar';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const Tarjeta = ({ user, setUser }) => {
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""
    });

    const [showCard, setShowCard] = useState(false); 

    useEffect(() => {
        const storedCard = localStorage.getItem("tarjeta");
        if (storedCard) {
            setState(JSON.parse(storedCard));
            setShowCard(true); 
        }
    }, []);

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFocusChange = (e) => {
        setState({
            ...state,
            focus: e.target.name
        });
    };

    const saveCard = () => {
        localStorage.setItem("tarjeta", JSON.stringify(state));
        alert("Tarjeta guardada con éxito");
        setShowCard(true); 
    };

    const editCard = () => {
        setShowCard(false); 
    };

    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <div className='card card-bank'>
                <div className='card-body'>
                    <Cards
                        number={state.number}
                        name={state.name}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        focused={state.focus}
                    />
                    
                    {showCard ? (
                        <div className="text-center mt-3">
                            <button className="btn btn-warning" onClick={editCard}>
                                Editar Tarjeta
                            </button>
                        </div>
                    ) : (
                        <form>
                            <div className="form-group">
                                <label htmlFor='number'>Número de la tarjeta</label>
                                <input type="text"
                                    name='number'
                                    id='number'
                                    maxLength="16"
                                    className='form-control'
                                    onChange={handleInputChange}
                                    onFocus={handleFocusChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor='name'>Nombre</label>
                                <input type="text"
                                    name='name'
                                    id='name'
                                    maxLength="17"
                                    className='form-control'
                                    onChange={handleInputChange}
                                    onFocus={handleFocusChange} />
                            </div>
                            <div className='form-row'>
                                <div className="form-group col-md-5">
                                    <label htmlFor='expiry'>Fecha de vencimiento</label>
                                    <input type="text"
                                        name='expiry'
                                        id='expiry'
                                        maxLength="4"
                                        className='form-control'
                                        onChange={handleInputChange}
                                        onFocus={handleFocusChange} />
                                </div>
                                <div className="form-group col-md-5 cvc">
                                    <label htmlFor='cvc'>CVC</label>
                                    <input type="text"
                                        name='cvc'
                                        id='cvc'
                                        maxLength="4"
                                        className='form-control'
                                        onChange={handleInputChange}
                                        onFocus={handleFocusChange} />
                                </div>
                            </div>
                            <button type='button' className='btn btn-info btn-block' onClick={saveCard}>
                                Aceptar
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Tarjeta;
