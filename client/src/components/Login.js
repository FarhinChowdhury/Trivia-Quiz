import React, {useState} from 'react';
import API from '../utils/API';
 
function Login(){

    const [userInfo, setUserInfo] = useState({});

    async function loginUser(data){
        const response = await API.loginUser(data).catch(err => console.log(err));
        console.log(response);
    }

    function handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case 'username': setUserInfo({...userInfo, username: value}); break;
            case 'password': setUserInfo({...userInfo, password: value}); break;
        }
    }

    function handleBtnClicked(event){
        const response = loginUser(userInfo);
        console.log(response);
    }

    return (

    );
}

export default Login;