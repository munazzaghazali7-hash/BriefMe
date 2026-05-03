import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const generateBriefingSummary = async (emailData: any, calendarData: any, driveData: any) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const prompt = `You are a smart personal assistant. Given the following data about a user's day, produce a structured JSON response.

EMAILS (today's unread):
${JSON.stringify(emailData, null, 2)}

CALENDAR EVENTS (today):
${JSON.stringify(calendarData, null, 2)}

DRIVE ACTIVITY (last 48 hours):
${JSON.stringify(driveData, null, 2)}

Respond ONLY with valid JSON matching this exact schema:
{
  "summary": "string (3-5 sentences, conversational tone, highlight the most important thing happening today)",
  "priorityEmails": [
    { "threadId": "string", "sender": "string", "subject": "string", "summary": "string (1 sentence)", "urgency": "high|medium|low" }
  ],
  "actionItems": [
    { "text": "string", "source": "email|calendar", "sourceId": "string" }
  ],
  "insights": "string (1 sentence observation about today — e.g. 'You have back-to-back meetings from 2-5pm, block time to prep.')"
}
Sort priorityEmails by urgency descending. Extract actionItems from both emails and meetings. Be concise.`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    
    if (!rawText) {
        throw new Error('Empty response from Gemini');
    }
    
    // Strip markdown code fences if present
    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsedData = JSON.parse(cleaned);
    return parsedData;
  } catch (error) {
    console.error('Error generating summary from Gemini:', error);
    throw new Error('Failed to generate briefing');
  }
};
