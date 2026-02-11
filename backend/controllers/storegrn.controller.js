import StoreGRN from '../models/storegrnds.js';

// Create Goods Receipt Note (GRN)
export const createGRN = async (req, res) => {
  try {
    const grn = new StoreGRN(req.body);
    await grn.save();
    res.status(201).json(grn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all GRNs
export const getAllGRNs = async (req, res) => {
  try {
    const grns = await StoreGRN.find();
    res.status(200).json(grns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
