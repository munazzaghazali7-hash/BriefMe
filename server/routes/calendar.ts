import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { fetchTodayEvents } from '../services/calendarService';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const events = await fetchTodayEvents(req.session.tokens);
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
