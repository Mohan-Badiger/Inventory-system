const mongoose = require('mongoose');

const itemcatdsschema = mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: String, required: true },
    categoryname: { type: String },
    description: { type: String },
    status: { type: String },

}, {
    timestamps: true
});

const itemcategoryds = mongoose.model("itemcategoryds", itemcatdsschema);

module.exports = itemcategoryds;
