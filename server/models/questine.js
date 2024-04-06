const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questine: {
    type: String,
    required: true
  },
  answers: {
    type: [String],
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;