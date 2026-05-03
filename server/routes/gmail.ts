import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { fetchRecentUnreadEmails } from '../services/gmailService';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const emails = await fetchRecentUnreadEmails(req.session.tokens);
    res.json({ success: true, data: emails });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
