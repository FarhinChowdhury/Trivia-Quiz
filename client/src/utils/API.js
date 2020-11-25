import axios from 'axios';

async function getAPIToken(){
    const response = await axios.get('https://opentdb.com/api_token.php?command=request')
                                .catch(err => console.log(err));
    return response.data.token;
}

function resetAPIToken(token){
    axios.get('https://opentdb.com/api_token.php?command=reset&token=' + token)
         .then(res => res.data.response_code !== 0 ? console.log('Token reset failed') : console.log('Token reset successful'))
         .catch(err => console.log(err));
}

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
    getQuestions: function(category, mode){
        const token = getAPIToken();
        let questions = [];
        if (mode === 'ta') {
            return new Promise((resolve, reject) => {
            axios.get('https://opentdb.com/api.php?amount=50' + (category ? `&category=${category}` : ''))
                .then(function (res) {
                    // console.log('[getQuestions](TA)', res);
                    if (res.data.response_code!==0) reject(res.data.response_code);
                    questions.push(...res.data.results);
                    resolve(questions);
                }).catch(err => reject(err)); // .then()
            });
        } else {
            return new Promise((resolve, reject) => {
            axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy' + (category ? `&category=${category}` : '') + `&token=${token}`)
                 .then(function (res) {
                    // console.log('[getQuestions](LVL)', res);
                    if (res.data.response_code!==0) reject(res.data.response_code);
                    questions.push(...res.data.results);
                    axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium' + (category ? `&category=${category}` : '') + `&token=${token}`)
                         .then(function (res) {
                            if (res.data.response_code!==0) reject(res.data.response_code);
                            questions.push(...res.data.results);
                            axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard' + (category ? `&category=${category}` : '') + `&token=${token}`)
                                 .then(function (res) {
                                    if (res.data.response_code!==0) reject(res.data.response_code);
                                    questions.push(...res.data.results);
                                    resetAPIToken(token);
                                    resolve(questions);
                                 }).catch(err => reject(err)); // .then()
                         }).catch(err => reject(err)); // .then()
                 }).catch(err => reject(err)); // .then()
            }); // new promise
        } // else-if
    }
}