const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    squat: { type: Number, required: true },
    benchPress: { type: Number, required: true },
    deadlift: { type: Number, required: true }
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;