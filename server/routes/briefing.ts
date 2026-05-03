import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { fetchRecentUnreadEmails } from '../services/gmailService';
import { fetchTodayEvents } from '../services/calendarService';
import { fetchRecentFiles, searchFilesByKeywords } from '../services/driveService';
import { generateBriefingSummary } from '../services/geminiService';

const router = Router();

router.get('/generate', requireAuth, async (req, res) => {
  try {
    const tokens = req.session.tokens;
    
    // Fetch data from Google APIs concurrently
    const [emails, rawEvents, recentFiles] = await Promise.all([
      fetchRecentUnreadEmails(tokens),
      fetchTodayEvents(tokens),
      fetchRecentFiles(tokens)
    ]);

    // Smart document linking: for each event, search drive for related files
    const eventsWithDocs = await Promise.all(rawEvents.map(async (event: any) => {
      let linkedDocs: any[] = [];
      if (event.title) {
        linkedDocs = await searchFilesByKeywords(tokens, event.title);
      }
      return { ...event, linkedDocs };
    }));

    // Send to Gemini
    const briefing = await generateBriefingSummary(emails, eventsWithDocs, recentFiles);

    // Merge the raw data with the briefing for display purposes
    res.json({
      success: true,
      data: {
        ai: briefing,
        raw: {
          emails,
          events: eventsWithDocs,
          files: recentFiles
        }
      }
    });
  } catch (error: any) {
    console.error('Error generating briefing:', error);
    res.status(500).json({ error: error.message || 'Failed to generate briefing' });
  }
});

export default router;
