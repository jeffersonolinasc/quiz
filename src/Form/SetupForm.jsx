import React from 'react'
import { useGlobalContext } from '../Context/Context'

export default function SetupForm() {
    const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
    return (
        <main>
            <section className="quiz quiz-small">
                <form action="" className="setup-form">
                    <h2>setup quiz</h2>
                    <div className="form-control">
                        <label htmlFor="amount">Número de Questões</label>
                        <input type="number" value={quiz.amount} onChange={handleChange} name='amount' id='amount' className='form-input' min={1} max={50} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="category">Categoria</label>
                        <select name="category" id="category" className='form-input'>
                            <option value="sports">sports</option>
                            <option value="history">history</option>
                            <option value="politics">politics</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="difficulty">Dificuldade</label>
                        <select name="difficulty" id="difficulty">
                            <option value="ease">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">difficult</option>
                        </select>
                    </div>
                    {error &&
                        <p className="error">Não foi possível gerar as questões. Tente novamente</p>
                    }

                    <button type='submit' className='submit-btn' onClick={handleSubmit}>
                        Começar
                    </button>
                </form>
            </section>
        </main>
    )
}
