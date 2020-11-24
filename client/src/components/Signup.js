import React from 'react';
import API from '../utils/API';

function Signup(){

    const [userInfo, setUserInfo] = useState({});

    async function userSignUp(data){
        const response = await API.createUser(data).catch(err => console.log(err));
        console.log(response);
    }

    function handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case 'username': setUserInfo({...userInfo, username: value}); break;
            case 'password': setUserInfo({...userInfo, password: value}); break;
            case 'email': setUserInfo({...userInfo, email: value}); break;
        }
    }

    function handleBtnClicked(event){
        event.preventDefault();
        userSignUp(userInfo);
    }

    return (

    );
}

export default Signup;