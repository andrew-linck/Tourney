var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tourneySchema = new Schema({
  tourneyName: {
    type: String,
    unique: true,
  },
  teams: [{
    teamName: String,
    players: [{type: String}],
  }]
});

var Tourney = mongoose.model('Tourney', tourneySchema);
module.exports = Tourney;
