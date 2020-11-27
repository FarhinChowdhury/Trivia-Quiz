const router = require("express").Router();
const orm = require("../../config/orm");

router.post('/user', orm.createUser);
router.post('/user/auth', orm.loginUser);
router.get('/highscore/ta', orm.getScoreTA);
router.get('/highscore/lvl', orm.getScoreLVL);
router.put('/user/:username', orm.updateScoreTA);
router.put('/user/:username', orm.updateScoreLVL);

module.exports = router;