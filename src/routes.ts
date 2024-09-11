import express from 'express';
import { handleGetRoot } from './handler/handler';

const router = express.Router();

router.get('/', handleGetRoot);

export default router;