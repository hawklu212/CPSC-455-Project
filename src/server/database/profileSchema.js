const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    email: String,
    maxIncline: Number,
    weight: Number,
    distancePreference: String,
});

module.exports = mongoose.model('ProfileModel', profileSchema);
