const mongoose = require("mongoose");

const storemasterschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    storename: {
        type: String,
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    storemanager: {
        type: String
    }
})

const storemasterds = mongoose.model("storemasterds", storemasterschema);

module.exports = storemasterds;