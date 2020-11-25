const db = require('./connection.js');
const userData = mongoose.model("userData", userSchema);

module.exports = {

    createUser: function (req, res) {
        db.userData
        .create({username: x, password: y, email: z })
        .then(userData => res.send(userData))
        .catch(err => console.log(err));
    },
    loginUser: function (req, res) {
        db.userData
        .findOne ({username: x}, {password: req.body.data})
        .then (data => res.send(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreTA: function (req, res) {
        db.userData
        .findOne({username: x}, {highscore_TA})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    getScoreLVL: function (req, res) {
        db.userData
        .findOne({username: x}, {highscore_LVL})
        .then (data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreTA: function (req, res) {
        db.userData
        .findOneAndUpdate ({username: x}, {highscore_TA: req.body.data})
        .then ( data => res.json(data))
        .catch(err => res.status(422).json(err));
    },

    updateScoreLVL: function (req, res) {
        db.userData
        .findOneAndUpdate ({username: x}, {highscore_TA: req.body.data})
        .then ( data => res.json(data))
        .catch(err => res.status(422).json(err));
    },
}

// let orm = {

//     userData.findOne()
//     setName (username){
//         console.log("[ORM setName...]");
//         return db.query(`INSERT INTO userData (username) VALUES ("${username}")`);
//     },
    
//     setEmail (email){
//         console.log("[ORM setEmail...]");
//         return db.query(`INSERT INTO userData (email) VALUES ("${email}")`);
//     },
    
//     setPassword(password){
//         console.log("[ORM setPassword...]");
//         return db.query(`INSERT INTO userData (password) VALUES ("${password}")`);
//     }
//     setTA(scoreTA, user){
//         console.log("[ORM setTA...]");
//         return db.query(`UPDATE userData SET highscore_TA = ${scoreTA} WHERE username = ${user}`);
//     }
//     setLVL(scoreLVL, user){
//         console.log("[ORM setLVL...]");
//         return db.query(`UPDATE userData SET highscore_LVL = ${scoreLVL} WHERE username = ${user}`);
//     }
// } ;

// module.exports = orm;
