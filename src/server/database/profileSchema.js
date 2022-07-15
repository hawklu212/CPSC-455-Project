const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    maxIncline: Number,
    weight: Number,
    distancePreference: String,
});

module.exports = mongoose.model('ProfileModel', profileSchema);
