const assert = require('assert');
const mongoose = require("mongoose");

var Summoner = require('../models/summoner');

exports.login = (req, res, next) =>  {
  // Login Summoner Page
  if (req.body.loginSummoner) {
    var summonerName = req.body.loginSummoner;
    var password = req.body.loginPassword;

    Summoner.authenticate(summonerName, password, function (err, summonerResult) {
      if (err || !summonerResult) {
        res.json("Join First");
      } else {
          req.session.summoner = summonerResult.summoner;
          req.session.summonerId = summonerResult._id;
          res.json("session");
        }
    });
  }
}
