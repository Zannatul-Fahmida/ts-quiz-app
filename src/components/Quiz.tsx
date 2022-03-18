import React from 'react';
import { setAnswer, setCurrentQuiz, setQuizOption } from '../redux/actions/quizActionTypes';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Quiz = () => {
    const dispatch = useAppDispatch()
    const quiz = useAppSelector((state)=> state.quizData);
    const currentQuiz = useAppSelector((state)=> state.currentQuiz);
    const filteredQuiz = quiz.filter( q => q.quizId === currentQuiz);
    
    const onSubmitHandler = (e: React.SyntheticEvent) =>{
        e.preventDefault();
        if(currentQuiz<quiz.length){
            dispatch(setCurrentQuiz())
        }
        else if(quiz.length === currentQuiz){
            dispatch(setAnswer())
        }
    }
    const optionHandler = (op:string) =>{
        dispatch(setQuizOption(op,`${currentQuiz}`))
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Questions {`${currentQuiz}/${quiz.length}`}</h1>
            <div>
                <h2>{filteredQuiz[0].name}</h2>
                <form onSubmit={ onSubmitHandler}>
                    {
                        filteredQuiz[0].options.map( (op) =>{
                    return(
                        <div onClick={ ()=> optionHandler(op) } key={op} className="single-option">
                            <input type="radio" name={`quizId${currentQuiz}`} id={op} required />
                            <label style={{width:"100%"}} htmlFor={op}>
                            { op }
                            </label>
                        </div>
                        )
                    })
                    }
                {
                    currentQuiz<quiz.length && <button type='submit'>Next</button>
                }
                {
                    quiz.length === currentQuiz && <button type='submit'>Submit</button>
                }
                </form>
                            
            </div>
        </div>
    );
};

export default Quiz;