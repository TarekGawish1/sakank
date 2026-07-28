import { VerificationStatus } from '@prisma/client';

export interface AdminVerificationResponse {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewNotes: string | null;
}

export interface AdminListingHideResponse {
  id: string;
  status: string;
  message: string;
}
