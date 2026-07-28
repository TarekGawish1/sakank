import { User, StudentProfile, OwnerProfile } from '@prisma/client';
import { MeResponse } from './auth.dto';

type UserWithProfiles = User & {
  studentProfile: StudentProfile | null;
  ownerProfile: OwnerProfile | null;
};

/**
 * Maps a full User model (with profiles) to a safe /auth/me response.
 * Strips sensitive fields like phoneVerifiedAt, lastLoginAt, deletedAt, version.
 */
export const toMeResponse = (user: UserWithProfiles): MeResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    role: user.role,
    isActive: user.isActive,
    studentProfile: user.studentProfile
      ? {
          id: user.studentProfile.id,
          universityId: user.studentProfile.universityId,
          faculty: user.studentProfile.faculty,
          academicYear: user.studentProfile.academicYear,
        }
      : null,
    ownerProfile: user.ownerProfile
      ? {
          id: user.ownerProfile.id,
          nationalId: user.ownerProfile.nationalId,
          occupation: user.ownerProfile.occupation,
        }
      : null,
  };
};
