const User = require("../model/userModel");
const { Strategy } = require("passport-google-oauth20");

const googleStrategy = new Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      console.log("Profile", profile);

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

module.exports = googleStrategy;
