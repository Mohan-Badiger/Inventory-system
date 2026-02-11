import express from 'express';
import { createGRN, getAllGRNs } from '../controllers/storegrn.controller.js';

const router = express.Router();

router.post('/', createGRN);
router.get('/', getAllGRNs);

export default router;
