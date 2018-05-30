const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndividualWorkoutSchema = new Schema({
  exercise: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = IndividualWorkout = mongoose.model(
  "individualWorkouts",
  IndividualWorkoutSchema
);
