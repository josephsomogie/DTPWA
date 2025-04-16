// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  // Initialize Firebase Admin SDK
  const serviceAccount = require('../config/serviceAccountKey.json'); // Adjust the path to your serviceAccount.json

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export Firestore instance
export const db = admin.firestore();
