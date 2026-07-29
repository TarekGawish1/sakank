import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging';
import { env } from '~/config/env';
import { logger } from '~/utils/logger';

let isFirebaseInitialized = false;

export const initFirebase = () => {
  if (isFirebaseInitialized) return;

  try {
    if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
      // Replace literal \n with actual newlines for the private key
      const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

      initializeApp({
        credential: cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
      isFirebaseInitialized = true;
      logger.info('✅ Firebase Admin SDK initialized successfully.');
    } else {
      logger.warn('⚠️ Firebase environment variables are missing. Push notifications will be skipped.');
    }
  } catch (error: any) {
    logger.error(`❌ Failed to initialize Firebase Admin SDK: ${error.message || error}`);
  }
};

/**
 * Sends a multicast push notification to multiple device tokens.
 */
export const sendMulticastNotification = async (tokens: string[], title: string, body: string, data?: Record<string, string>) => {
  if (!isFirebaseInitialized || tokens.length === 0) return;

  try {
    const message: MulticastMessage = {
      tokens,
      notification: {
        title,
        body,
      },
      data,
    };

    const response = await getMessaging().sendEachForMulticast(message);
    
    if (response.failureCount > 0) {
      const failedTokens: string[] = [];
      response.responses.forEach((resp: any, idx: number) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
          logger.error(`❌ FCM Error for token ${tokens[idx]}: ${resp.error?.message || resp.error}`);
        }
      });
      // Optionally: Clean up invalid tokens from the database here
    }
  } catch (error: any) {
    logger.error(`❌ Failed to send multicast push notification: ${error.message || error}`);
  }
};
