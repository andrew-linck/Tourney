const assert = require("assert");
const mongoose = require("mongoose");

var Tourney = require('../models/tourney');

exports.tourney = (req, res, next) =>  {
  var tourneyReq = req.params.tourney;

  Tourney.findOne({'tourneyName': tourneyReq}, function(err, tourneyData) {
    if (err) {
      console.log(err);
    } else {
        if(!tourneyData) {
        var tourneySchema = new Tourney({
          tourneyName: tourneyReq
        })

        var tourneySaved = tourneySchema.save();
        assert.ok(tourneySaved instanceof Promise);

        tourneySaved.then(function (tourneyDataUpdated) {
          res.json(tourneyDataUpdated.teams);
        });
      } else {
          if(tourneyData)
          res.json(tourneyData.teams);
        }
      }
  });
};
