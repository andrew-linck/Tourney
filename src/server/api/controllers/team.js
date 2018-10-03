const assert = require('assert');
const mongoose = require("mongoose");

var Tourney = require('../models/tourney');

exports.teamaddress = (req, res, next) =>  {
  var teamMember = req.session.summoner;
  var tourneyReq = req.params.tourney;
  var teamReq = req.params.teamName;

  var filter = {tourneyName: tourneyReq, 'teams.teamName': teamReq}
  var update = {$addToSet: {'teams.$.players': teamMember}}
  var option = {new: true}

  Tourney.findOneAndUpdate(filter, update, option, function (err, teamData) {
    if (err) {
      next(err);
    } else {
      if (!teamData) {
        Tourney.findOne({'tourneyName': tourneyReq}, function(err, tourneyData) {
          if (err) {
            next(err);
          } else {
              if(!tourneyData) {
                return res.send("Tourney Doesn't Exist");
            } else {
                tourneyData.teams.push({teamName: teamReq});
                var teamSaved = tourneyData.save();
                assert.ok(teamSaved instanceof Promise);

                teamSaved.then(function (tourneyDataNew) {
                  teamFiltered = tourneyDataNew.teams.find(team => team.teamName === teamReq)
                  res.json(teamFiltered);
                });
              }
            }
          });
        } else if (teamData) {
            teamFiltered = teamData.teams.find(team => team.teamName === teamReq)
            res.json(teamFiltered);
          }
      }
  });
};
