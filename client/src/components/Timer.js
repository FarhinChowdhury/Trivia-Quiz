import React,{useState, useEffect, useContext} from 'react';
import globalContext from '../utils/globalContext';

function Timer(){

    const {mode} = useContext(globalContext);

    const [timer, setTimer] = useState(90);

    useEffect(function(){
        if(mode === 'lvl') setTimer(60);
    }, []);

    useEffect(function(){
        const timerOut = setTimeout(() => {
            if(timer === 0) {
                clearTimeout(timerOut);
                window.location.href='/score';
                return ;
            }
            setTimer(parseInt(timer) - 1);
        }, 1000)
    }, [timer]);

    return (
        <span style={{position: 'fixed',
                      top: '100px',
                      left: '46%',
                      padding: '20px',
                      fontWeight: 'bold', 
                      backgroundColor: 'rgba(12, 12, 78, 0.664)',
                      border: '2px rgba(255, 119, 0, 0.817) solid',
                      borderRadius: '10px'}}>
            Time: {timer}
        </span>
    );
}

export default Timer;