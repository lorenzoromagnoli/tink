//var passport = require('passport');

module.exports.express = {
  customMiddleware: function (app) {

    // Passport Auth Middleware
    // Credit:
    // @theangryangel https://gist.github.com/theangryangel/5060446
    // @Mantish https://gist.github.com/Mantish/6366642
    // @anhnt https://gist.github.com/anhnt/8297229
    //app.use(passport.initialize());
    //app.use(passport.session());
  }
};

module.exports.cache = {

	// The number of seconds to cache files being served from disk
	// (only works in production mode)
	maxAge: 31557600000
};