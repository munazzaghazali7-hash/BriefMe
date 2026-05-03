import { google } from 'googleapis';
import { getOAuth2Client } from './googleClient';

export const fetchTodayEvents = async (tokens: any) => {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials(tokens);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: today.toISOString(),
      timeMax: tomorrow.toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return res.data.items?.map(event => ({
      id: event.id,
      title: event.summary,
      description: event.description || '',
      startTime: event.start?.dateTime || event.start?.date,
      endTime: event.end?.dateTime || event.end?.date,
      attendees: event.attendees?.map(a => ({ email: a.email, name: a.displayName || a.email })) || []
    })) || [];
  } catch (error) {
    console.error('Error fetching Calendar:', error);
    throw new Error('Failed to fetch events');
  }
};
