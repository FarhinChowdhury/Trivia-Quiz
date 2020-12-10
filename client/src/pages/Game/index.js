import React, { useState, useEffect, useContext } from 'react';
import {NavLink} from 'react-router-dom';
import useSound from 'use-sound';
import he from 'he';
import './Game.css'
import correctSound from '../../assets/correct.mp3';
import incorrectSound from '../../assets/incorrect.mp3';
import API from '../../utils/API';
import Timer from '../../components/Timer';
import {globalContext} from '../../utils/globalContext';


function Game(){

    const [data, setData] = useContext(globalContext);
    var temp = {...data};

    // const {category, mode, score, setValue} = useContext(globalContext);
    // questions & choices: for storing ALL questions and their respective choices
    // correctAns: for storing correct answer for ALL questions
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);
    const [correctAns, setCorrectAns] = useState(['']);
    // choice: for storing user's choice
    const [choice, setChoice] = useState('');
    const [isConfirm, setIsConfirm] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    // displayQuestion & displayChoices: for setting question and its choices on screen
    const [displayQuestion, setDisplayQuestion] = useState('');
    const [displayChoices, setDisplayChoices] = useState([]);
    // for playing sound effect
    const [playCorrect] = useSound(correctSound, {volume: 0.25});
    const [playInCorrect] = useSound(incorrectSound, {volume: 0.25});

    // for iterating through questions and choices
    const [index, setIndex] = useState(0);

    useEffect(function(){
        getQuestions();
        // reset score for new game
        temp.score = 0;
        setData({...temp});
    }, []);

    async function getQuestions(){
        const response = await API.getQuestions(data.category, data.mode).catch(err => console.log(err));
        let questions = [];
        let choices = [];
        let corAnswers = [];
        response.forEach(item => {
            item.incorrect_answers.push(item.correct_answer);
            questions.push(item.question);
            choices.push(item.incorrect_answers);
            corAnswers.push(item.correct_answer);
        });
        // storing master question set and choices set
        setQuestions(questions);
        setChoices(choices);
        // storing the correct answer for each question
        setCorrectAns(corAnswers);
        // displaying the first question and first set of choices
        setDisplayQuestion(questions[index]);
        if(choices[index].length !== 4) setDisplayChoices(['True', 'False']);
        else setDisplayChoices(shuffleArray(choices[index]));
    }

    // for randomize the choices
    function shuffleArray(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    function handleBtnClicked(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case 'choice': {
                setChoice(value);
                setIsClicked(true);
                break;
            }
            case 'confirm': {
                if(choice === '') break;
                // check if answer is correct and trigger indicator
                if(choice === correctAns[index]) {
                    temp.score++;
                    playCorrect();
                }
                else {
                    playInCorrect();
                }
                setIsConfirm(true);
                // load next question 
                if(index !== questions.length - 1){
                    const timer = setTimeout(() => {
                        setDisplayQuestion(questions[index + 1]);
                        if(choices[index + 1].length !== 4) setDisplayChoices(['True', 'False']);
                        else setDisplayChoices(shuffleArray(choices[index + 1]));
                        setIndex(index + 1);
                        clearTimeout(timer);
                        setIsClicked(false);
                        setIsConfirm(false);
                        setChoice('');
                    },1000);
                }
                break;
            }
            default: break;
        };
        setData({...temp});
    }

    return(
    <>
        <Timer />
        <div className="container">
            <div className="card" id = "questionCard">
                <h3 id="question" style={{borderBottom: "2px rgba(255, 119, 0, 0.817) solid"}}>{index+1}. {he.decode(displayQuestion)}
                 {index < 10 && data.mode === 'lvl' ? <span className="badge badge-success diffBadge">Easy</span> : ""}
                 {index < 20 && index >= 10 && data.mode === 'lvl' ? <span className="badge badge-warning diffBadge">Medium</span> : ""}
                 {index < 30 && index >= 20 && data.mode === 'lvl' ? <span className="badge badge-danger diffBadge">Hard</span> : ""}</h3>
                <hr />

                <div className="row" style={{padding: '10px'}}>
                    {displayChoices.map(choice =>
                        <button type="button" className="btn btn-outline-warning col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" name="choice" value={choice}
                                onClick={handleBtnClicked} key={displayChoices.indexOf(choice)}
                                style={{padding: '30px', fontSize: '30px', fontWeight: 'bold', color: 'white', border: '2px rgba(255, 119, 0, 0.817) solid'}}>
                            {he.decode(choice)}
                        </button>
                    )}
                </div>
                <span className="badge badge-dark" style={isClicked ? {display: "block"} : {display: "none"}}>Selected: {he.decode(choice)}</span>
                <span className="badge badge-success" style={isConfirm ? {display: "block"} : {display: "none"}}>Correct Answer: {he.decode(correctAns[index])}</span>
                <hr />
                {index === questions.length - 1 ?
                    <NavLink to='/score' className="enterBtn">            
                        <button name="confirm" style={{backgroundColor: "transparent", border: "none"}}>
                            CONFIRM
                        </button>
                    </NavLink>
                    :
                    <button className="enterBtn" name="confirm" onClick={handleBtnClicked} >
                         CONFIRM
                    </button>
                }   
            </div>
        </div>
    </>
    )
}

export default Game;