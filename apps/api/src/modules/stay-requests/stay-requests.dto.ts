import { StayRequestStatus } from '@prisma/client';

export interface CreateStayRequestDto {
  listingId: string;
  message?: string;
  moveInDate: string;
  durationMonths: number;
}

export interface StayRequestResponse {
  id: string;
  listingId: string;
  status: StayRequestStatus;
  message: string | null;
  moveInDate: string;
  durationMonths: number;
  ownerResponse: string | null;
  respondedAt: string | null;
  createdAt: string;
  listing: {
    id: string;
    title: string;
    monthlyRent: number;
    primaryImage: string | null;
    location: string;
  };
  student: {
    id: string;
    firstName: string;
    lastName: string;
  };
  // Owner phone only included when status is ACCEPTED
  ownerPhone: string | null;
}

export interface StayRequestsQueryDto {
  status?: StayRequestStatus;
  page: number;
  limit: number;
}
