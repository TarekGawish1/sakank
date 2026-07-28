import { VerificationRequest, User } from '@prisma/client';
import { AdminVerificationResponse } from './admin.dto';

type VerificationWithUser = VerificationRequest & { user: User };

export const toAdminVerificationResponse = (
  request: VerificationWithUser,
): AdminVerificationResponse => {
  return {
    id: request.id,
    userId: request.userId,
    userName: `${request.user.firstName} ${request.user.lastName}`.trim(),
    userPhone: request.user.phone,
    status: request.status,
    submittedAt: request.submittedAt.toISOString(),
    reviewedAt: request.reviewedAt?.toISOString() || null,
    reviewNotes: request.reviewNotes || null,
  };
};
