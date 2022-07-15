const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    email: String,
    userName: String,
    userPass: String,
    accessToken: String,
    verified: Boolean,
});

module.exports = mongoose.model('ProfileModel', profileSchema);
