const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number
  },
  availability_1: {
    type: Date,
    required: true
  },
  availability_2: {
    type: Date,
    required: true
  },
  contact_name: {
    type: String,
    required: true,
    trim: true
  },
  contact_phone: {
    type: String
  },
  contact_email: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
