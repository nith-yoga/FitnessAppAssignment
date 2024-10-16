const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    exerciseName: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true }
});

const Workout = mongoose.model("Workout", workoutSchema, "Workouts");
module.exports = Workout;