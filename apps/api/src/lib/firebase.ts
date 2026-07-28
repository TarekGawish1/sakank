import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { env } from '~/config/env';

let firebaseApp: App | null = null;
let _firebaseAuth: Auth | null = null;

const getFirebaseApp = (): App => {
  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApp()
      : initializeApp({
          credential: cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
  }
  return firebaseApp;
};

/**
 * Lazily initialized Firebase Auth instance.
 * Only connects to Firebase when an auth endpoint is actually called.
 * This allows the server to start even without valid Firebase credentials.
 */
export const getFirebaseAuth = (): Auth => {
  if (!_firebaseAuth) {
    _firebaseAuth = getAuth(getFirebaseApp());
  }
  return _firebaseAuth;
};
