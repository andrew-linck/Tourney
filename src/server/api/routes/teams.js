const express = require("express");
const router = express.Router();

const TeamController = require('../controllers/team');
const summonerAuth = require('../middleware/summonerAuth');

router.post('/:tourney/:teamName', summonerAuth, TeamController.teamaddress);
router.get('/:tourney/:teamName', summonerAuth, TeamController.teamaddress);

module.exports = router;
