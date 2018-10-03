const assert = require('assert');
const mongoose = require("mongoose");

var Tourney = require('../models/summoner');

exports.logout = (req, res, next) =>  {
  // Logout
  if(req.body.logoutSummoner) {
    req.session.destroy( function(err) {
      if(err) {
        res.json("error")
      } else {
        res.json("logout")
      }
    });
  }
}
