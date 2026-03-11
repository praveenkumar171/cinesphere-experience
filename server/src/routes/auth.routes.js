const router = require("express").Router();
const { signup, login, refreshToken, logout } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
