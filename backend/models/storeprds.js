import mongoose from 'mongoose';

const prItemSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  itemName: {
    type: String,
  },
  itemMake: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  itemUnit: {
    type: String,
  },
});

const storePrSchema = new mongoose.Schema(
  {
    prNumber: {
      type: String,
      required: true,
    },

    prDate: {
      type: Date,
      required: true,
    },

    items: [prItemSchema],

    remark: {
      type: String,
    },

    createdBy: {
      type: String,
    },

    authorisedSignatory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('StorePR', storePrSchema);
