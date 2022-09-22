const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../Models/User");
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
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        const newUser = {
          username: profile.displayName,
          email: profile.emial || "private",
          profilePicture: profile.photos[0],
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
          res.json(error);
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
