import express from 'express';
import { searchWithQuery } from '../controller/search.controller.js';

const router = express.Router();

// Search movies endpoint
router.get('/movies', searchWithQuery);

export default router;