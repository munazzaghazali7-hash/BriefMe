import { google } from 'googleapis';
import { getOAuth2Client } from './googleClient';

export const fetchRecentUnreadEmails = async (tokens: any) => {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    // 24 hours ago in seconds
    const yesterday = Math.floor(Date.now() / 1000) - (24 * 60 * 60);
    const query = `is:unread after:${yesterday}`;

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 20
    });

    const messages = res.data.messages || [];
    if (messages.length === 0) return [];

    const emailData = await Promise.all(messages.map(async (message) => {
      if (!message.id) return null;
      const msgRes = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'Date']
      });

      const headers = msgRes.data.payload?.headers || [];
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown Sender';
      const date = headers.find(h => h.name === 'Date')?.value || '';

      return {
        id: message.id,
        threadId: message.threadId,
        subject,
        from,
        date,
        snippet: msgRes.data.snippet || ''
      };
    }));

    return emailData.filter(Boolean);
  } catch (error) {
    console.error('Error fetching Gmail:', error);
    throw new Error('Failed to fetch emails');
  }
};
