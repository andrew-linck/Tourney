const express = require("express");
const router = express.Router();

const SummonerController = require('../controllers/summoner');

router.post("/", SummonerController.home);
router.get("/", SummonerController.home);

module.exports = router;
