import { NotFoundError, BadRequestError } from '~/shared/errors';
import { PaginationMeta } from '~/shared/types';
import { adminRepository } from './admin.repository';
import { AdminVerificationResponse, AdminListingHideResponse } from './admin.dto';
import { toAdminVerificationResponse } from './admin.mapper';

export const adminService = {
  /**
   * Lists pending verification requests with pagination.
   */
  listPendingVerifications: async (
    page: number,
    limit: number,
  ): Promise<{ items: AdminVerificationResponse[]; meta: PaginationMeta }> => {
    const { requests, total } = await adminRepository.findPendingVerifications(page, limit);

    return {
      items: requests.map(toAdminVerificationResponse),
      meta: { page, limit, total },
    };
  },

  /**
   * Admin approves a verification request.
   */
  approveVerification: async (
    verificationId: string,
    adminUserId: string,
  ): Promise<AdminVerificationResponse> => {
    const request = await adminRepository.findVerificationById(verificationId);
    if (!request) {
      throw new NotFoundError('Verification Request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestError(
        `Cannot approve a verification with status: ${request.status}`,
      );
    }

    const updated = await adminRepository.updateVerificationStatus(
      verificationId,
      'APPROVED',
      adminUserId,
    );

    return toAdminVerificationResponse(updated);
  },

  /**
   * Admin rejects a verification request with a reason.
   */
  rejectVerification: async (
    verificationId: string,
    adminUserId: string,
    reason: string,
  ): Promise<AdminVerificationResponse> => {
    const request = await adminRepository.findVerificationById(verificationId);
    if (!request) {
      throw new NotFoundError('Verification Request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestError(
        `Cannot reject a verification with status: ${request.status}`,
      );
    }

    const updated = await adminRepository.updateVerificationStatus(
      verificationId,
      'REJECTED',
      adminUserId,
      reason,
    );

    return toAdminVerificationResponse(updated);
  },

  /**
   * Admin force-hides a listing.
   */
  hideListing: async (listingId: string): Promise<AdminListingHideResponse> => {
    const listing = await adminRepository.findListingById(listingId);
    if (!listing) {
      throw new NotFoundError('Listing');
    }

    if (listing.status === 'ARCHIVED') {
      throw new BadRequestError('Listing is already hidden/archived');
    }

    await adminRepository.hideListing(listingId);

    return {
      id: listingId,
      status: 'ARCHIVED',
      message: 'Listing has been hidden successfully',
    };
  },
};
