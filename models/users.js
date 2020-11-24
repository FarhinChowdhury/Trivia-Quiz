const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userData = new Schema({

  userData: [
      {
          username: {
              type: String,
              required: [true, 'Please enter a username.'],
              trim: true
          },
          email: {
              type: String,
              required: true,
              trim: true,
              match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
          },
          password: {
            type: String,
            minlength: [8, 'Enter a password no less than 8 characters in length.'],
            required: true,
            trim: true
          },
          highscore_TA: {
            type: Number
          },
          highscore_LVL: {
            type: Number
          }
      }
  ]

});

const userData = mongoose.model("User Data", userSchema);

module.exports = userData;
