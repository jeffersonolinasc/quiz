import { useContext, createContext } from "react";
import { useState } from "react"
import axios from 'axios';


const AppContext = createContext();
const AppProvider = ({ children }) => {


    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);


    const table = {
        sport: 21,
        history: 23,
        politics: 24,
    };


    const [quiz, setQuiz] = useState(
        {
            amount: 4,
            category: "sport",
            difficulty: "easy"
        }
    ) // quiz



    //buscando informações da api 

    const fetchQuestions = async (url) => {
        setLoading(true);
        setWaiting(false);
        const response = await axios(url)
            .catch((error) => console.log(error))

        if (response) {
            const data = response.data.results;

            // console.log(data);

            if (data.length) {
                setQuestions(data)
                setLoading(false);
                setError(false);
            } else {
                setWaiting(true);
                setLoading(true);
            }
        } else {
            setWaiting(true);
        }
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setWaiting(true);
        setCorrect(0);
    }


    const nextQuestion = () => {
      
       
        setIndex((oldIndex) => {    
            const index = oldIndex + 1;
            console.log(index);

            if (index > oldIndex.lenght - 1) {
                openModal();
                return 0;

            } else {
                return index;
            }
        })
    }


    const previousQuestion = () => {
      
        
        setIndex((oldIndex) => {    
            const index = oldIndex + 1;

            if (index > oldIndex.lenght - 1) {
                openModal();
                return 0;

            } else {
                return index;
            }
        })
    }

    const checkAnswers = (value) => {
        if (value) {
            setCorrect((oldState) => oldState + 1);
        }

        nextQuestion();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuiz({ ...quiz, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, difficulty, category } = quiz;


        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&&type=multiple`;


        fetchQuestions(url);
    }

    return (
        <AppContext.Provider value={{ waiting, loading, questions, index, correct, modal, nextQuestion, checkAnswers, closeModal, previousQuestion, quiz, handleSubmit, handleChange }}>
            {children}
        </AppContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider };



