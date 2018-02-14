const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      mongoose = require('mongoose'),
      keys = require('../config/keys'),
      User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {

        const registeredUser = await User.findOne({ googleID: profile.id});

        if(registeredUser){
            done(null, registeredUser);
        }
        else{
            const user = await new User({ googleID: profile.id }).save();
            done(null, user);
        }
    })
);
