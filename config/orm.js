const userData = require('../models/users.js');
const path = require('path');
const bcrypt = require( 'bcrypt' );

async function passwordHash(password){
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    return hashedPassword;
}

async function passwordCompare(password, hashedPassword){
    const isValidPassword = await bycrypt.compare(password.trim(), hashedPassword);
    return isValidPassword;
}


const orm = {

    createUser: async function (req, res) {
        req.body.data.password = await passwordHash(req.body.data.password);
        console.log(req.body.data);
        userData
        .create(req.body.data)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    },

    loginUser: function (req, res) {
        console.log(`[loginUser] username=${req.body.data.username} password=${req.body.data.password}`);
        userData
        .findOne ({username: req.body.data.username})
        .then (function(data) {
            const isValid = bcrypt.compareSync(req.body.data.password, data.password)
            console.log(`[loginUser] valid=${isValid} username=${req.body.data.username} password=${req.body.data.password}`);
            if(isValid) res.send(data);
            else res.send({});
        })
        .catch(err => res.status(422).json(err));
    },

    getUser: function (req, res) {
      userData
      .findOne ({username: req.params.username})
      .then (data => res.json(data))
      .catch(err => res.status(422).json(err));
    },

    getScoreTA: function (req, res) {
        userData
        .find({})
        .sort({highscore_TA: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreLVL: function (req, res) {
        userData
        .find({})
        .sort({highscore_LVL: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateHighscore: function (req, res){
        userData
        .findOneAndUpdate({username: req.params.username}, req.body.data)
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScore: function (req, res) {
        console.log('[updateHighscore] body=', req.params.username, req.body.data)
        userData
        .findOneAndUpdate ({username: req.params.username}, req.body.data)
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    // updateScoreLVL: function (req, res) {
    //     userData
    //     .findOneAndUpdate ({username: req.body.username}, {highscore_LVL: req.body.highscore_LVL})
    //     .then (data => res.json(data))
    //     .catch(err => res.status(422).json(err));
    // },

    updateProfilePic: function (req, res) {
      // console.log('[post /api/image] req.body=', req.body);
      let picUrl = path.join('uploads', req.file.filename);
      console.log('[post /api/image] src=', picUrl);
      // res.json({pic_url: picUrl});
      userData
      .findOneAndUpdate ({username: req.body.username}, {pic_url: picUrl}, {new: true})
      .then (data => res.json(data))
      .catch(err => res.status(422).json(err));
    },
}

module.exports = orm;
