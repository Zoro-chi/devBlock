const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../Models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(profile.id, salt);

        const newUser = {
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
          gitHubId: profile.id,
          password: hashedPass,
        };

        try {
          let user = await User.findOne({ gitHubId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
