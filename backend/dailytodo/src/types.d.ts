declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        clientId?: string;
      };
    }
  }
}

export {};
