import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { fetchRecentFiles } from '../services/driveService';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const files = await fetchRecentFiles(req.session.tokens);
    res.json({ success: true, data: files });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
