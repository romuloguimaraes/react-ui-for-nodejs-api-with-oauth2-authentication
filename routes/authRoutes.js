const passport = require('passport');

module.exports = (app) => {

    // Google OAuth Routes
    app.get(
        '/auth/google', 
        passport.authenticate('google', { 
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback/', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

    app.get(
        '/api/logout', (req, res) => {
            req.logout();
            res.redirect('/');            
        }
    );

    app.get(
        '/api/logged-user', (req, res) => {
            res.send(req.user);
        }
    );
}