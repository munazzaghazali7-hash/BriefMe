import { google } from 'googleapis';
import { getOAuth2Client } from './googleClient';

export const fetchRecentFiles = async (tokens: any) => {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials(tokens);
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const res = await drive.files.list({
      q: `modifiedTime > '${twoDaysAgo.toISOString()}'`,
      orderBy: 'modifiedTime desc',
      pageSize: 10,
      fields: 'files(id, name, mimeType, modifiedTime, webViewLink, iconLink)'
    });

    return res.data.files || [];
  } catch (error) {
    console.error('Error fetching Drive files:', error);
    throw new Error('Failed to fetch Drive files');
  }
};

export const searchFilesByKeywords = async (tokens: any, keyword: string) => {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials(tokens);
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    // Basic word split for searching
    const words = keyword.split(' ').filter(w => w.length > 3);
    if (words.length === 0) return [];
    
    // We only take the first 2 significant words to avoid overly complex queries
    const searchQuery = words.slice(0, 2).map(w => `name contains '${w}'`).join(' or ');
    
    const res = await drive.files.list({
      q: `(${searchQuery}) and trashed = false`,
      pageSize: 3,
      fields: 'files(id, name, mimeType, modifiedTime, webViewLink, iconLink)'
    });

    return res.data.files || [];
  } catch (error) {
    console.error('Error searching Drive files:', error);
    return []; // Return empty array on search failure so it doesn't break the main flow
  }
};
