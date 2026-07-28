import { VerificationRequest } from '@prisma/client';
import { VerificationStatusResponse } from './verification.dto';

export const toVerificationStatusResponse = (
  request: VerificationRequest,
): VerificationStatusResponse => {
  return {
    id: request.id,
    status: request.status,
    submittedAt: request.submittedAt.toISOString(),
    reviewedAt: request.reviewedAt?.toISOString() || null,
    reviewNotes: request.reviewNotes || null,
  };
};
