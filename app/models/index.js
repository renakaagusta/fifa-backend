const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.player = require("./player.model");
db.role = require("./role.model");

db.ROLES = ["user", "participant", "admin"];

module.exports = db;