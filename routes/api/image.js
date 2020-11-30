const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const router = require("express").Router();

const { updateProfilePic } = require("../../config/orm");

// configure multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (process.env.NODE_ENV === "production") {
      cb(null, path.join(__dirname, '../../client/build/uploads'));
    } else {
      cb(null, path.join(__dirname, '../../client/public/uploads'));
    }
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}.png`);
  }
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

router.post('/image', upload.single('profile_pic'), updateProfilePic);

module.exports = router;