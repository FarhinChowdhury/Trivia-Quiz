const router = require("express").Router();
const { 
    createUser,
    loginUser,
    getScoreTA,
    getScoreLVL,
    updateScoreTA,
    updateScoreLVL
} = require("../../config/orm");

const userController = require("../../controllers/userController");

router.get('/highscore/ta', getScoreTA.findAll);

router.get('/highscore/lvl', getScoreLVL.findAll);

router.post('/user', createUser.create);

router.post('/user/auth', loginUser.check);

router.put('/user/:id', updateScoreTA.findOneAndUpdate);

router.put('/user/:id', updateScoreLVL.findOneAndUpdate);


module.exports = router;