import { ConflictError, NotFoundError } from '~/shared/errors';
import { verificationRepository } from './verification.repository';
import { VerificationStatusResponse } from './verification.dto';
import { toVerificationStatusResponse } from './verification.mapper';

export const verificationService = {
  /**
   * Submits a new verification request for the owner.
   * Business Rule: Cannot submit if already has a PENDING request.
   */
  submitVerification: async (userId: string): Promise<VerificationStatusResponse> => {
    // Check for existing pending request
    const existingPending = await verificationRepository.findPendingByUser(userId);
    if (existingPending) {
      throw new ConflictError(
        'You already have a pending verification request',
        'VER_001',
      );
    }

    const request = await verificationRepository.create(userId);
    return toVerificationStatusResponse(request);
  },

  /**
   * Returns the latest verification status for the user.
   */
  getVerificationStatus: async (userId: string): Promise<VerificationStatusResponse | null> => {
    const request = await verificationRepository.findLatestByUser(userId);
    if (!request) {
      return null;
    }
    return toVerificationStatusResponse(request);
  },
};
