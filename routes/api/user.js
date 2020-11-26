const router = require("express").Router();
const userController = require("../../controllers/userController");

router.get('/highscore/ta', userController.findAll);

router.get('/highscore/lvl', userController.findAll);

router.post('/user', userController.create);

router.post('/user/auth', userController.check);

router.put('/user/:id', userController.findOneAndUpdate);

module.exports = router;