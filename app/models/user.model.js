const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        verification: {
            type: Number,
            default: 0,
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        }, ],
        created_at: {
            type: Date,
            default: Date.now(),
        },
        updated_at: {
            type: Date,
            default: Date.now(),
        },
    })
);

module.exports = User;