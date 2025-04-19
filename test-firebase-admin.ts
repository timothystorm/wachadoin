import * as admin from 'firebase-admin';

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  console.log('Firebase Admin SDK initialized successfully');
  admin.auth();
  console.log('Firebase Admin Auth accessed successfully');
} catch (error) {
  console.error('Error:', error);
}

console.log('Test complete');
