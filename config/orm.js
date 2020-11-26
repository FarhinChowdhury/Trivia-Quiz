const userData = require('./users.js')

module.exports = {

    createUser: function (req, res) {
        userData
        .create(req.body.data)
        .then(userData => res.send(userData))
        .catch(err => console.log(err));
    },
    loginUser: function (req, res) {
        userData
        .findOne ({username: req.body.data.username})
        .then (data => res.send(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreTA: function (req, res) {
        userData
        .findOne({username: req.body.data.username})
        .sort({highscore_TA: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreLVL: function (req, res) {
        userData
        .findOne({username: req.body.data.username})
        .sort({highscore_LVL: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreTA: function (req, res) {
        userData
        .findOneAndUpdate ({username: req.body.data.username}, {highscore_TA: req.body.data.highscore_TA})
        .then ( data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreLVL: function (req, res) {
        userData
        .findOneAndUpdate ({username: req.body.data.username}, {highscore_LVL: req.body.data.highscore_LVL})
        .then ( data => res.json(data))
        .catch(err => res.status(422).json(err));
    },
}
