const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      userSchema = new Schema({ googleID: String });

mongoose.model('users', userSchema);
