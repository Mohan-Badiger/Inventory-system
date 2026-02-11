import express from 'express';
import { createPR, getAllPRs } from '../controllers/storepr.controller.js';

const router = express.Router();

router.post('/', createPR);
router.get('/', getAllPRs);

export default router;
