const mongoose = require('mongoose');

const storepoorderdsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    user: {
        type: String,
        required: [true, 'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true, 'Please enter colid']
    },
    year: {
        type: String
    },
    vendor: {
        type: String
    },
    vendorid: {
        type: String
    },
    poid: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    returnamount: {
        type: Number
    },
    netprice: {
        type: Number
    },
    updatedate: {
        type: Date
    },
    postatus: {
        type: String
    },

    status1: {
        type: String
    },
    comments: {
        type: String
    },
    // Dynamic Approval Fields
    currentStep: { type: Number, default: 1 },
    approvalStatus: { type: String, default: 'Pending' },
    doclink: { type: String },
    creatorName: { type: String }
})

const storepoorderds = mongoose.model('storepoorderds', storepoorderdsschema);

module.exports = storepoorderds;