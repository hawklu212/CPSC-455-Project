const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedRouteSchema = new Schema({
    name: String,
    email: String,
    origin: String,
    destination: String
    
});

module.exports = mongoose.model('SavedRouteModel', savedRouteSchema);
