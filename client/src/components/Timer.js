import React,{useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {globalContext} from '../utils/globalContext';

function Timer(){

    const [data, setData] = useContext(globalContext);

    const [timer, setTimer] = useState(90); // use same timer value for lvl, ta modes
    // const [timer, setTimer] = useState(data.mode==='lvl' ? 60: 90); // Init timer value here instead of in useEffect

    let history = useHistory();

    // Comment out to fix conflict where two timers start: one with 60 and another with 90
    // useEffect(function(){
    //     if(data.mode === 'lvl') setTimer(60); // 60
    // }, []);

    useEffect(function(){
        const timerOut = setTimeout(() => {
            if(timer === 0) {
                clearTimeout(timerOut);
                history.push('/score');
                return ;
            }
            setTimer(parseInt(timer) - 1);
        }, 1000)
    }, [timer]);

    return (
        <center>
            <div className="container timer" style={{marginTop: '3%'}}>
                <span style={{
                        padding: '20px',
                        fontWeight: 'bold', 
                        backgroundColor: 'rgba(12, 12, 78, 0.664)',
                        border: '2px rgba(255, 119, 0, 0.817) solid',
                        borderRadius: '10px'}}>
                    Time: {timer}
                </span>
            </div>
        </center>
    );
}

export default Timer;