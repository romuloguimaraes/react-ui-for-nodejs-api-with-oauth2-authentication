const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
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
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {

        User.findOne({ googleID: profile.id})
            .then((registeredUser) => {
                if(registeredUser){
                    done(null, registeredUser);
                }
                else{
                    new User({ googleID: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
    })
);


// Facebook OAuth Strategy
passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['displayName', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);       
    })
);