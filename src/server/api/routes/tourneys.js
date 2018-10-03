const express = require("express");
const router = express.Router();

const TourneyController = require('../controllers/tourney');
const summonerAuth = require('../middleware/summonerAuth');

router.post("/:tourney", summonerAuth, TourneyController.tourney);
router.get("/:tourney", summonerAuth, TourneyController.tourney);

module.exports = router;
