const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
  listingDate: {
    type: Date,
    default: Date.now
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service'
    }
  ]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
