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


let orm = {

    createUser: function (req, res) {
        req.body.data.password = passwordHash(req.body.data.password);
        userData
        .create(req.body.data)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    },

    loginUser: function (req, res) {
        userData
        .findOne ({username: req.body.username})
        .then ((data) => {
            if(passwordCompare(req.body.password, data.password)) res.send(data);
            else {
                alert('Incorrect username/password');
                return false;
            }
        })
        .catch(err => res.status(422).json(err));
    },

    getScoreTA: function (req, res) {
        userData
        .findOne({username: req.body.username})
        .sort({highscore_TA: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreLVL: function (req, res) {
        userData
        .findOne({username: req.body.username})
        .sort({highscore_LVL: -1})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateHighscore: function (req, res){
        userData
        .findOneAndUpdate({_id: req.params.id}, req.body.data)
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreTA: function (req, res) {
        userData
        .findOneAndUpdate ({username: req.body.username}, {highscore_TA: req.body.highscore_TA})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreLVL: function (req, res) {
        userData
        .findOneAndUpdate ({username: req.body.username}, {highscore_LVL: req.body.highscore_LVL})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateProfilePic: function (req, res) {
      // console.log('[post /api/image] req.body=', req.body);
      let picUrl = path.join('uploads', req.file.filename);
      console.log('[post /api/image] src=', picUrl);
      res.json({pic_url: picUrl});
      // userData
      // .findOneAndUpdate ({username: req.body.username}, {pic_url: req.body.pic_url})
      // .then (data => res.json(data))
      // .catch(err => res.status(422).json(err));
    },
}

module.exports = orm;
