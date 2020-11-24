import axios from 'axios';

export default {
    getHighscore: function(selector){
        return axios.get('/api/highscore/' + selector);
    },
    updateHighscore: function(data, id){
        return axios.put('/api/user/' + id, {data: data});
    },
    createUser: function(userData){
        return axios.post('/api/user', {data: userData});
    },
    loginUser: function(userData){
        return axios.post('/api/user/auth', {data: userData});
    },
    getQuestions: function(){
        return axios.get()
    }
}