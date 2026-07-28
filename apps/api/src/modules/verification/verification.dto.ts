import { VerificationStatus } from '@prisma/client';

export interface SubmitVerificationDto {
  nationalIdFrontUrl: string;
  nationalIdBackUrl: string;
}

export interface VerificationStatusResponse {
  id: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewNotes: string | null;
}
