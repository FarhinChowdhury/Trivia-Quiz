import React,{useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import globalContext from '../utils/globalContext';

function Timer(){
    const [data, dispatch] = useContext(globalContext);
    const {mode} = data;

    const [timer, setTimer] = useState(60);

    let history = useHistory();

    useEffect(function(){
        if(mode === 'lvl') setTimer(60);
    }, []);

    useEffect(function(){
        const timerOut = setTimeout(() => {
            if(timer === 0) {
                clearTimeout(timerOut);
                history.push('/score');
                // window.location.href='/score';
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