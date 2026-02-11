const mongoose = require('mongoose');

const itemunitdsschema = mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: String, required: true },
    unitname: { type: String },
    unitcode: { type: String },
    description: { type: String },
    status: { type: String },

}, {
    timestamps: true
});

const itemunitds = mongoose.model("itemunitds", itemunitdsschema);

module.exports = itemunitds;