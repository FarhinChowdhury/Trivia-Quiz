import React, {useState, useEffect} from 'react';
import API from '../utils/API';

function Leaderboard(){
    
    const [result, setResult] = useState([]);

    useEffect(function(){
        getHighscore('ta');
    }, []);

    async function getHighscore(selector){
        const response = await API.getHighscore(selector);
        setResult(response.data);
    };

    function handleBtnClicked(event){
        const name = event.target.name;
        switch(name){
            case 'timeAttack': getHighscore('ta'); break;
            case 'levels': getHighscore('lvl'); break;
            default: break;
        }
    }


    return (
        <>
            {result.map(user => <Display user={user} />)}
        </>
    );
}

export default Leaderboard;