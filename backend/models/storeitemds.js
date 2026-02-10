const mongoose = require('mongoose');

const storeitemschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    storeid: { type: String },
    storename: { type: String },
    itemcode: { type: String },
    itemname: { type: String },
    quantity: { type: Number },
    type: { type: String },
    status: { type: String },
    category: { type: String }, // New
    unit: { type: String }      // New
});

const storeitemds = mongoose.model('storeitemds', storeitemschema);
module.exports = storeitemds;