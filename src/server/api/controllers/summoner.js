const mongoose = require("mongoose");
const request = require('request');
const querystring = require('querystring');
const keys = require('../keys/riotapi.js');

var Summoner = require('../models/summoner');

exports.home = (req, res, next) =>  {
// Landing
  // Join Page
  if(!req.session.summonerId & !req.body.summonerNameJoin & !req.body.summonerNameVerify & !req.body.summonerNameCreate & !req.body.loginSummoner & !req.body.logoutSummoner) {
    res.json({error: null});
  }

  if(req.body.summonerNameJoin) {
  let summonerNameJoin = req.body.summonerNameJoin;
    var apiKey = keys.RIOTAPI_KEY;
    let url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerNameJoin}?api_key=${apiKey}`;

    request(url, function(err, response, body) {
      if(err) {
        res.json('error');
      } else {
        let summonerParse = JSON.parse(body);
        var summoner = {name: summonerParse.name, icon: summonerParse.profileIconId}

        if(summoner == undefined) {
          res.json("summoner does not exist");
        } else {
          if(summoner.icon != 18) {
            res.json(summoner);
          } else {
            if(summoner.icon == 18) {
              res.json(summoner);
            }
          }
        }
      }
    });
  }
  // Verify Summoner Page
  if(req.body.summonerNameVerify) {
    var summonerNameVerify = req.body.summonerNameVerify;
    var summonerIconVerify = req.body.summonerIconVerify;
    var apiKey = keys.RIOTAPI_KEY;
    let url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerNameVerify}?api_key=${apiKey}`;

    request(url, function(err, response, body) {
        if(err) {
          res.json('error');
        } else {
          let summonerParse = JSON.parse(body);
          var summoner = {name: summonerParse.name, icon: summonerParse.profileIconId}

          if(summoner == undefined) {
            res.json('error');
          } else {
            if(summoner.icon != summonerIconVerify) {
              res.json("changed");
            } else {
              if(summoner.icon == summonerIconVerify) {
                res.json("not changed");
              }
            }
          }
        }
      });
  }
  // Create Summoner Account Page
  if (req.body.summonerNameCreate) {
  var summonerNameCreate = req.body.summonerNameCreate;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;

  var summonerData = {
    summoner: summonerNameCreate,
    password: password,
    passwordConfirm: passwordConfirm
  }

  if(password != passwordConfirm) {
    res.json("passwords do not match")
  }

  Summoner.create(summonerData, function (err, summonerResult) {
    if (err) {
      res.json("account already exists")
    } else {
        req.session.summoner = summonerResult.summoner;
        req.session.summonerId = summonerResult._id;
        res.json("create tourney")
      }
    });
  }
  // Create Tourney Page
  if(req.session.summonerId) {
    Summoner.findById(req.session.summonerId)
      .exec(function (err, summonerResult) {
        if(err) {
          res.json("error")
        } else {
          res.json("session")
        }
    });
  }
};
