module.exports = (req, res, next) => {
  if (req.session && req.session.summonerId) {
    return next();
  } else {
    var err = new Error('Create Account To View The Tourney Page');
    res.json('Log In First');
  }
};
