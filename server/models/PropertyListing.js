const mongoose = require('mongoose');

const PropertyListingSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  commercialPropertyAddress: { type: String, required: true },
  companyName: { type: String, required: true },
  positionOfLister: { type: String, required: true },

  // tracking approval status
  isApproved: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false}
});

const PropertyListing = mongoose.model('PropertyListing', PropertyListingSchema);

module.exports = PropertyListing;
