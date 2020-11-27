const router = require("express").Router();
const orm = require("../../config/orm");

router.post('/user', orm.createUser);
router.post('/user/auth', orm.loginUser);
router.get('/user/:username', orm.getUser);
router.get('/highscore/ta', orm.getScoreTA);
router.get('/highscore/lvl', orm.getScoreLVL);
router.put('/highscore/:username', orm.updateScore);
//router.put('/user/:username', orm.updateScoreLVL);

module.exports = router;