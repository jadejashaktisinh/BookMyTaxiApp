const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [6, 'Name must be at least 6 characters long'],
    maxlength: [100, 'Name must not exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Please provide a valid email address'
    }
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: 'Phone number must be exactly 10 digits'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Name must be at least 6 characters long'],
    maxlength: [100, 'Name must not exceed 100 characters']
  }
});

module.exports = mongoose.model('User', userSchema);
