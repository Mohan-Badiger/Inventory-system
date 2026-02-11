const mongoose = require('mongoose');

const itemtypeschema = new mongoose.Schema({
    name: {type: String,required: true},
    user: {type: String,required: true},
    colid: {type: Number,required: true},
    itemtype: {type: String,},
    description: {type: String},
    status: {type: String}
})

const itemtypeds = mongoose.model('itemtypeds', itemtypeschema);
module.exports = itemtypeds;