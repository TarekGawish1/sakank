import { NotFoundError, BadRequestError } from '~/shared/errors';
import { PaginationMeta } from '~/shared/types';
import { adminRepository } from './admin.repository';
import { AdminVerificationResponse, AdminListingHideResponse } from './admin.dto';
import { toAdminVerificationResponse } from './admin.mapper';

export const adminService = {
  getStats: async () => {
    return adminRepository.getStats();
  },

  listUsers: async (page: number, limit: number, search?: string) => {
    const { users, total } = await adminRepository.findUsers(page, limit, search);
    const items = users.map((u) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      role: u.role,
      gender: u.gender,
      isBlocked: !!u.deletedAt,
      createdAt: u.createdAt,
    }));
    return { items, meta: { page, limit, total } };
  },

  listProperties: async (page: number, limit: number, search?: string) => {
    const { properties, total } = await adminRepository.findProperties(page, limit, search);
    const items = properties.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      address: p.address,
      propertyType: p.propertyType,
      governorate: p.governorate?.name,
      city: p.city?.name,
      area: p.area?.name,
      owner: p.ownerProfile?.user
        ? {
            id: p.ownerProfile.user.id,
            name: `${p.ownerProfile.user.firstName} ${p.ownerProfile.user.lastName}`,
            email: p.ownerProfile.user.email,
            phone: p.ownerProfile.user.phone,
          }
        : null,
      primaryImage: p.images[0]?.url || null,
      createdAt: p.createdAt,
    }));
    return { items, meta: { page, limit, total } };
  },

  blockUser: async (userId: string) => {
    const updated = await adminRepository.toggleBlockUser(userId);
    if (!updated) throw new NotFoundError('User');
    return { id: userId, isBlocked: !!updated.deletedAt };
  },

  deleteProperty: async (propertyId: string) => {
    await adminRepository.deleteProperty(propertyId);
    return { id: propertyId, message: 'Property deleted successfully' };
  },

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
