const express = require("express");
const router = express.Router();

const LogoutController = require('../controllers/logout');

router.post("/logout", LogoutController.logout);

module.exports = router;
