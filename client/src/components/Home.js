import React, {useContext} from 'react';
import globalContext from '../utils/globalContext';

function Home(){
    
    const {setValue} = useContext(globalContext);

    function handleSelector(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case 'category': setValue('select', value); break;
            case 'mode': {
                setValue('mode', value); 
                if(value === 'lvl') setValue('totalScore', 30);
                break;
            }
        }
    }

    return (

    );
}

export default Home;