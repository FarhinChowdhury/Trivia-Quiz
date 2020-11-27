import React, { useEffect, useContext } from 'react';
import API from '../utils/API';
import globalContext from '../utils/globalContext';

function Game(){

    const {select, mode, score, setValue} = useContext(globalContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState('');

    const [trigger, setTrigger] = useState('');
    const [correctAns, setCorrectAns] = useState([]);
    const [displayQuestion, setDisplayQuestion] = useState('');

    var index = 0;

    useEffect(function(){
        getQuestions();
        setDisplayQuestion(questions[index]);
    }, []);

    async function getQuestions(){
        const response = await API.getQuestions(select, mode);
        setQuestions(response);
        setAnswers();
        setCorrectAns();
    }

    function handleBtnClicked(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case 'choice': setChoice(value); break;
            case 'confirm': {
                // check if answer is correct and trigger indicator
                if(choice === correctAns[index]) {
                    setTrigger(true);
                    setValue('score', score + 1);
                }
                else setTrigger(false);               
                // load next question 
                if(index !== questions.length - 1) {
                    let timer = setTimeout(() => {
                        setDisplayQuestion(questions[index+1]);
                        return () => clearTimeout(timer)
                    }, 1000);
                    setTrigger('');
                    index += 1;
                } else {
                    let timer = setTimeout(() => {
                        index = 0;
                        getQuestions();
                        setDisplayQuestion(questions[index]);
                        return () => clearTimeout(timer);
                    }, 1000);
                    setTrigger('');
                }
                break;
            };
        };
    }

    return (

    );
}

export default Game;