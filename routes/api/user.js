const router = require("express").Router();
const orm = require("../../config/orm");

router.post('/user', orm.createUser);
router.post('/user/auth', orm.loginUser);
router.get('/highscore/ta', orm.getScoreTA);
router.get('/highscore/lvl', orm.getScoreLVL);
router.put('/user/:id', orm.updateScoreTA);
router.put('/user/:id', orm.updateScoreLVL);

module.exports = router;