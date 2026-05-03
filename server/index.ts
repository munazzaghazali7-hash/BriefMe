import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import authRoutes from './routes/auth';
import briefingRoutes from './routes/briefing';
import gmailRoutes from './routes/gmail';
import calendarRoutes from './routes/calendar';
import driveRoutes from './routes/drive';

// In dev: loads from ../.env relative to /server
// In production (Cloud Run): env vars are injected, dotenv is a no-op
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// In dev, allow localhost:3000; in prod, same origin so CORS not needed
if (!isProd) {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
}

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use('/auth', authRoutes);
app.use('/api/briefing', briefingRoutes);
app.use('/api/gmail', gmailRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/drive', driveRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve React static files in production
if (isProd) {
  // When compiled: __dirname = /app/server/dist, so go up 2 levels to /app
  // When ts-node:  __dirname = /app/server, so go up 1 level to /app
  const appRoot = path.join(__dirname, '..', '..');
  const clientDist = path.join(appRoot, 'client', 'dist');
  app.use(express.static(clientDist));
  // SPA fallback — all non-API routes serve index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
