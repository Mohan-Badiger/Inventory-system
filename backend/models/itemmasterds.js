const mongoose = require('mongoose');

const itemmasterschema = new mongoose.Schema({
    name: { type: String, required: true }, // Internal Name
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    itemname: { type: String },
    itemcode: { type: String },
    itemtype: {type: String,},
    category: {type: String,},
    unit: {type: String,},
    description: {type: String},
    image: { type: String },
    status: { type: String }
});

const itemmasterds = mongoose.model('itemmasterds', itemmasterschema);
module.exports = itemmasterds;