import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      user_id: string | undefined;
      name: string | undefined;
      email: string | undefined;
      picture?: string | undefined;
    };
  }
}
