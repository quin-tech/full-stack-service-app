const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Service = require('./Service');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  orders: [Order.schema],
  services: [Service.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  // Obtain DB connection password from .env
  if (this.isNew || this.isModified(process.env.USER_PASSWORD)) {
      const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
