const router = require("express").Router();
const userRoutes = require("./user");
const imgRoutes = require("./image");

// User routes
router.use(userRoutes);
router.use(imgRoutes);

module.exports = router;
