var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SummonerSchema = new Schema({
  summoner: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  }
});

SummonerSchema.statics.authenticate = function(summonerName, password, callback) {
  Summoner.findOne({summoner: summonerName}, function(err, summoner) {
    if (err) {
      return callback(err)
    } else if (!summoner) {
        return callback(err);
      }
      bcrypt.compare(password, summoner.password, function (err, result) {
        if (result === true) {
          return callback(null, summoner);
        } else {
          return callback();
        }
      })
  });
}

SummonerSchema.pre('save', function(next) {
      var summoner = this;
      bcrypt.hash(summoner.password, 10, function (err, hash) {
        if (err) {
          return next(err);
        }
        summoner.password = hash;
        bcrypt.hash(summoner.passwordConfirm, 10, function (err, hash) {
          if (err) {
            return next(err);
          }
          summoner.passwordConfirm = hash;
          next();
        })
      })
    });

var Summoner = mongoose.model('Summoner', SummonerSchema);
module.exports = Summoner;
