const router = require("express").Router();
const User = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// passport auth configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({
          googleId: profile.id,
        }).lean();
        if (user) {
          done(null, user);
        } else {
          user = await User.create({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            photoURL: profile.photos[0].value,
          });
          done(null, user);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Auth routes

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/shelf");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  console.log(req.user);
  res.redirect("/");
});

module.exports = router;
