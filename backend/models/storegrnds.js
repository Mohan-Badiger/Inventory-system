import mongoose from "mongoose";

const grnItemSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  itemName: {
    type: String,
  },
  itemMake: {
    type: String,
  },
  receivedQty: {
    type: Number,
  },
  itemUnit: {
    type: String,
  },
  unitPrice: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
});

const storeGrnSchema = new mongoose.Schema(
  {
    grnNumber: {
      type: String,
      required: true,
    },

    grnDate: {
      type: Date,
      required: true,
    },

    challanNo: {
      type: String,
    },

    challanDate: {
      type: Date,
    },

    billNo: {
      type: String,
    },

    billDate: {
      type: Date,
    },

    poNumber: {
      type: String,
    },

    prNumber: {
      type: String,
    },

    vendorName: {
      type: String,
    },

    items: [grnItemSchema],

    grandTotal: {
      type: Number,
    },

    grandTotalInWords: {
      type: String,
    },

    remark: {
      type: String,
    },

    receivedBy: {
      type: String,
    },

    authorisedSignatory: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("StoreGRN", storeGrnSchema);
