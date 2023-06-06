import React from 'react'

export default function Modal() {

    return (
        <div className="modal-container isOpen">
            <div className='modal-content'>
                <h2>Parabéns</h2>
                <p>Você respondeu</p>
                <button className='close-btn'>Iniciar novamente</button>
            </div>
        </div>
    )
}
