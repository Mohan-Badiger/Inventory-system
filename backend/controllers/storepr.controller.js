import StorePR from '../models/storeprds.js';

// Create Purchase Requisition (PR)
export const createPR = async (req, res) => {
  try {
    const pr = new StorePR(req.body);
    await pr.save();
    res.status(201).json(pr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all PRs
export const getAllPRs = async (req, res) => {
  try {
    const prs = await StorePR.find();
    res.status(200).json(prs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
