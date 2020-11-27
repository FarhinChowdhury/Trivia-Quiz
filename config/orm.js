const userData = require('../models/users.js');
const path = require('path');

let orm = {

    createUser: function (req, res) {
        userData
        .create(req.body)
        .then(userData => res.send(userData))
        .catch(err => console.log(err));
    },

    loginUser: function (req, res) {
        userData
        .findOne ({username: req.body.username})
        .then (data => res.send(data))
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
