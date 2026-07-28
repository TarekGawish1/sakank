import { UserRole } from '@prisma/client';

export interface VerifyOtpDto {
  firebaseToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isNewUser: boolean;
  };
}

export interface RefreshResponse {
  accessToken: string;
}

export interface MeResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  gender: string;
  role: UserRole;
  isActive: boolean;
  studentProfile: {
    id: string;
    universityId: string;
    faculty: string | null;
    academicYear: string | null;
  } | null;
  ownerProfile: {
    id: string;
    nationalId: string | null;
    occupation: string | null;
  } | null;
}
