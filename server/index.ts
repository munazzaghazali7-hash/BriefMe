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

dotenv.config({ path: '../.env' });

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
  // Works for both: ts-node (server/index.ts) and compiled (server/dist/index.js)
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));
  // SPA fallback — all non-API routes serve index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
