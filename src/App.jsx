import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SetupForm from './Form/SetupForm'
import Modal from './Modal/Modal'
import Loading from './Loading/LoadingScreen'
import { useGlobalContext } from './Context/Context'

function App() {


  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswers } = useGlobalContext();


  if (waiting) {
    return (
      <SetupForm></SetupForm>
    )
  }

  if (loading) {
    return <Loading />
  }


  const { incorrect_answers, correct_answer, question } = questions[index];
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }



  return (
    <>
      <main>
        <section className="quiz">
          <p className="correct-answers">
            Respostas Corretas: {correct} / {index}
          </p>
          <article className="container">
            <h2>{question}</h2>
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => checkAnswers(correct_answer === answer)}

                  >
                    {answer}
                  </button>
                )
              })}
            </div>
          </article>
          {index > 0 &&
            <button className="next-question" onClick={nextQuestion}>
              Voltar questão
            </button>
          }

          <button className="next-question" onClick={nextQuestion}>
            Próxima questãos
          </button>

        </section>
      </main>
    </>
  )
}

export default App
