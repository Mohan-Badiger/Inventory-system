const mongoose = require('mongoose');

const storerequisationschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    year: { type: String },
    itemcode: { type: String },
    itemname: { type: String },
    store: { type: String },
    storeid: { type: String },
    reqdate: { type: Date },
    quantity: { type: Number },
    reqstatus: { type: String },
    poid: { type: String }
});

const storerequisationds = mongoose.model('storerequisationds', storerequisationschema);
module.exports = storerequisationds;