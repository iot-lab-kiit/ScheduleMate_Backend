import { credential } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';
import 'dotenv/config';

class Firebase {
  public firebase: App;

  constructor() {
    this.firebase = initializeApp({
      credential: credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
      }),
    });
  }
}

export const FirebaseProvider = new Firebase();
