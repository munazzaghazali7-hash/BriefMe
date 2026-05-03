import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.tokens) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Add session typing
declare module 'express-session' {
  interface SessionData {
    tokens: any;
    user: {
      name: string;
      email: string;
      picture: string;
    };
  }
}
