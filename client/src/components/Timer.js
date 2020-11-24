import React,{useState, useEffect, useContext} from 'react';
import globalContext from '../utils/globalContext';

function Timer(){

    const {mode} = useContext(globalContext);

    const [timer, setTimer] = useState('');

    useEffect(function(){
        if(mode === 'ta') setTimer('60');
        else setTimer('60');
    }, [mode])

    return (
        <span>{timer}</span>
    );
}

export default Timer;