import {createContext, useState} from 'react';

const initialState = {
    username: '',
    pic_url: '',
    highscore_TA: 0,
    highscore_LVL: 0,
    category: '',
    mode: '',
    score: 0,
    totalScore: 0
}

export const globalContext = createContext();

const Store = ({ children }) => {
    const [data, setData] = useState(initialState);
    return (
        <globalContext.Provider value={[data, setData]}>{children}</globalContext.Provider>
    );
}

export default Store;