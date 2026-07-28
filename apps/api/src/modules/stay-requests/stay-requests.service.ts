import { ConflictError, NotFoundError, ForbiddenError, BadRequestError } from '~/shared/errors';
import { PaginationMeta } from '~/shared/types';
import { stayRequestsRepository } from './stay-requests.repository';
import { CreateStayRequestDto, StayRequestResponse, StayRequestsQueryDto } from './stay-requests.dto';
import { toStayRequestResponse } from './stay-requests.mapper';

export const stayRequestsService = {
  /**
   * Creates a new stay request.
   * Business Rules:
   * - Student cannot have a duplicate active request for the same listing (BR-REQ-001)
   * - Unit must be Available (BR-REQ-002)
   */
  createRequest: async (
    userId: string,
    dto: CreateStayRequestDto,
  ): Promise<StayRequestResponse> => {
    const studentProfileId = await stayRequestsRepository.getStudentProfileId(userId);
    if (!studentProfileId) {
      throw new NotFoundError('Student Profile');
    }

    // Check for duplicate active request
    const existing = await stayRequestsRepository.findByStudentAndListing(
      studentProfileId,
      dto.listingId,
    );
    if (existing) {
      throw new ConflictError(
        'You already have an active request for this listing.',
        'REQ_001',
      );
    }

    // Create the request
    const stayRequest = await stayRequestsRepository.create({
      listingId: dto.listingId,
      studentProfileId,
      message: dto.message,
      moveInDate: new Date(dto.moveInDate),
      durationMonths: dto.durationMonths,
    });

    return toStayRequestResponse(stayRequest);
  },

  /**
   * Lists stay requests for the authenticated user (student or owner).
   */
  listRequests: async (
    userId: string,
    role: string,
    query: StayRequestsQueryDto,
  ): Promise<{ items: StayRequestResponse[]; meta: PaginationMeta }> => {
    const { requests, total } = await stayRequestsRepository.findByUser(
      userId,
      role,
      query.status,
      query.page,
      query.limit,
    );

    return {
      items: requests.map(toStayRequestResponse),
      meta: { page: query.page, limit: query.limit, total },
    };
  },

  /**
   * Returns a single stay request with details.
   */
  getRequestDetail: async (
    requestId: string,
    userId: string,
  ): Promise<StayRequestResponse> => {
    const request = await stayRequestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundError('Stay Request');
    }

    // Authorization: only the student or the owner can view
    const isStudent = request.studentProfile.userId === userId;
    const isOwner = request.listing.unit.property.ownerProfile.userId === userId;

    if (!isStudent && !isOwner) {
      throw new ForbiddenError('You are not authorized to view this request');
    }

    return toStayRequestResponse(request);
  },

  /**
   * Owner accepts a stay request.
   * State machine: PENDING → APPROVED
   */
  acceptRequest: async (
    requestId: string,
    userId: string,
  ): Promise<StayRequestResponse> => {
    const request = await stayRequestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundError('Stay Request');
    }

    // Authorization: only the owner can accept
    if (request.listing.unit.property.ownerProfile.userId !== userId) {
      throw new ForbiddenError('Only the property owner can accept this request');
    }

    // State machine check
    if (request.status !== 'PENDING') {
      throw new BadRequestError(
        `Cannot accept a request with status: ${request.status}`,
        'REQ_002',
      );
    }

    const updated = await stayRequestsRepository.updateStatus(requestId, 'APPROVED');
    return toStayRequestResponse(updated);
  },

  /**
   * Owner rejects a stay request.
   * State machine: PENDING → REJECTED
   */
  rejectRequest: async (
    requestId: string,
    userId: string,
    reason?: string,
  ): Promise<StayRequestResponse> => {
    const request = await stayRequestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundError('Stay Request');
    }

    if (request.listing.unit.property.ownerProfile.userId !== userId) {
      throw new ForbiddenError('Only the property owner can reject this request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestError(
        `Cannot reject a request with status: ${request.status}`,
        'REQ_002',
      );
    }

    const updated = await stayRequestsRepository.updateStatus(requestId, 'REJECTED', reason);
    return toStayRequestResponse(updated);
  },

  /**
   * Student cancels their stay request.
   * State machine: PENDING → CANCELLED
   */
  cancelRequest: async (
    requestId: string,
    userId: string,
  ): Promise<StayRequestResponse> => {
    const request = await stayRequestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundError('Stay Request');
    }

    if (request.studentProfile.userId !== userId) {
      throw new ForbiddenError('Only the requesting student can cancel this request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestError(
        `Cannot cancel a request with status: ${request.status}`,
        'REQ_002',
      );
    }

    const updated = await stayRequestsRepository.updateStatus(requestId, 'CANCELLED');
    return toStayRequestResponse(updated);
  },
};
