# BriefMe - Smart Daily Briefing Assistant

BriefMe is a smart daily briefing assistant that reads your Gmail, Google Calendar, and Google Drive, then generates a personalized morning briefing with AI-powered summaries and action items.

<!-- Screenshot Placeholder: `` -->

## Overview
- **Vertical**: Productivity / Work
- **Approach**: The application uses a pipeline of Fetch → AI Summarise → Display. It fetches data from your connected Google accounts, passes the relevant data to Google's Gemini AI to extract summaries and action items, and displays them in a clean, unified dashboard.

## How it Works
1. **OAuth Login**: Authenticate with your Google Account to grant read-only access to Gmail, Calendar, and Drive.
2. **Fetch from APIs**: The backend fetches your unread emails from the last 24 hours, today's calendar events, and recently modified Drive documents.
3. **Gemini Summarises**: The fetched data is compiled into a prompt and sent to Gemini to generate an overarching summary, extract priority emails, and outline action items.
4. **Structured Briefing**: The parsed JSON from Gemini is displayed in a beautiful, structured briefing view, complete with context links.

## Google Services Used
- **Gmail API**: To fetch recent unread emails.
- **Google Calendar API**: To fetch today's events and meetings.
- **Google Drive API**: To fetch recently active documents and intelligently link them to meetings.
- **Gemini API (gemini-1.5-pro)**: To summarize data and extract action items.

## Setup Instructions

### Prerequisites
- Node 18+
- A personal Google Account
- Google Cloud Project with OAuth credentials (Client ID & Secret) and APIs enabled (Gmail, Calendar, Drive)
- Google Gemini API Key

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Start the development servers:
   ```bash
   npm run dev
   ```
   The client will run on http://localhost:3000 and the server on http://localhost:3001.

## Assumptions Made
- The user has a personal Gmail account.
- The user has properly set up OAuth credentials in the Google Cloud Console.
- The environment has Node.js 18 or higher installed.
