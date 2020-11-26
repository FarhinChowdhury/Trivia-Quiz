import React, { useState, useEffect, useContext } from 'react';
import useSound from 'use-sound';
import he from 'he';
import './Game.css'
import correctSound from '../../components/assets/correct.mp3';
import incorrectSound from '../../components/assets/incorrect.mp3';
import API from '../../utils/API';
import globalContext from '../../utils/globalContext';


function Game(){

    const {select, mode, score, setValue} = useContext(globalContext);
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);
    const [choice, setChoice] = useState('');

    const [isConfirm, setIsConfirm] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [correctAns, setCorrectAns] = useState([]);
    const [displayQuestion, setDisplayQuestion] = useState('');
    const [displayChoices, setDisplayChoices] = useState([]);

    const [index, setIndex] = useState(0);

    useEffect(function(){
        getQuestions();
    }, []);

    async function getQuestions(){
        const response = await API.getQuestions("", 'ta');
        let questions = [];
        let choices = [];
        let corAnswers = [];
        response.forEach(item => {
            item.incorrect_answers.push(item.correct_answer);
            questions.push(item.question);
            choices.push(item.incorrect_answers);
            corAnswers.push(item.correct_answer);
        });
        setQuestions(questions);
        setChoices(choices);
        setCorrectAns(corAnswers);
        setDisplayQuestion(questions[index]);
        if(choices[index].length !== 4) setDisplayChoices(['True', 'False']);
        else setDisplayChoices(shuffleArray(choices[index]));
    }

    const shuffleArray = function(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const [playCorrect] = useSound(correctSound, {volume: 0.25});
    const [playInCorrect] = useSound(incorrectSound, {volume: 0.25});

    function handleBtnClicked(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        switch(name){
            case 'choice': {
                setChoice(value);
                setIsClicked(true);
                break;
            }
            case 'confirm': {
                // check if answer is correct and trigger indicator
                if(choice === correctAns[index]) {
                    console.log('Right answer');
                    setIsConfirm(true);
                    setValue('score', score + 1);
                    playCorrect();
                }
                else {
                    setIsConfirm(false);
                    playInCorrect();
                }          
                // load next question 
                if(index !== questions.length - 1){
                    setDisplayQuestion(questions[index + 1]);
                    if(choices[index].length !== 4) setDisplayChoices(['True', 'False']);
                    else setDisplayChoices(shuffleArray(choices[index]));
                    setIndex(index + 1)
                }
                setIsClicked(false);
                setIsConfirm('');
                setChoice('');
                break;
            }
            default: break;
        };
    }

    return(
    <center>
        <div className="container">
            <div className="card" id = "questionCard">
                <h3 style={{borderBottom: "2px rgba(255, 119, 0, 0.817) solid"}}>{index+1}. {he.decode(displayQuestion)}</h3>
                <hr />
                <div className="row" style={{padding: '10px'}}>
                    {displayChoices.map(choice =>
                        <button type="button" className="btn btn-outline-warning col-6" name="choice" value={choice}
                                onClick={handleBtnClicked} key={displayChoices.indexOf(choice)}
                                style={{padding: '30px', fontSize: '30px', fontWeight: 'bold', color: 'white', border: '2px rgba(255, 119, 0, 0.817) solid'}}>
                            {he.decode(choice)}
                        </button>
                    )}
                </div>
                <span class="badge badge-dark" style={isClicked ? {display: "block"} : {display: "none"}}>Selected: {he.decode(choice)}</span>
                <hr />
                <button className="enterBtn" name="confirm" onClick={handleBtnClicked} >
                    CONFIRM
                </button>
            </div>
        </div>
    </center>
    )
}

export default Game;