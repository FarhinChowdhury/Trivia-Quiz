const router = require("express").Router();
const { 
    createUser,
    loginUser,
    getScoreTA,
    getScoreLVL,
    updateScoreTA,
    updateScoreLVL
} = require("../../config/orm");


router.post('/user', createUser);

router.post('/user/auth', loginUser);

router.get('/highscore/ta', getScoreTA);

router.get('/highscore/lvl', getScoreLVL);

router.put('/user/:id', updateScoreTA);

router.put('/user/:id', updateScoreLVL);


module.exports = router;