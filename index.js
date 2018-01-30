const express = require('express'),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),
      passport = require('passport'),
      keys = require('./config/keys'),
      PORT = process.env.PORT || 5000,
      app = express();

app.use(
   cookieSession({
       maxAge: 30 * 24 * 60 * 60 * 1000,
       keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

require('./models/User');
require('./services/passport');
require('./routes/authRoutes')(app);

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});