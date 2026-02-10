const mongoose = require('mongoose');

const storeuserdsschema = new mongoose.Schema({
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
    storeuser: {
        type: String
    },
    storeid: {
        type: String
    },
    store: {
        type: String
    },
    userid: {
        type: String
    },
    level: {
        type: String
    }
})

const storeuserds = mongoose.model('storeuserds', storeuserdsschema);

module.exports = storeuserds;