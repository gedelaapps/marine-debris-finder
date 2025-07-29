const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: String,
  imageUrl: String,
  lat: Number,
  lng: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);