import { User, StudentProfile, University } from '@prisma/client';
import { StudentProfileResponse, UniversityResponse } from './users.dto';
import { sanitizeText } from '~/shared/utils/sanitize';

type UserWithStudentProfile = User & {
  studentProfile: (StudentProfile & { university: University }) | null;
};

export const toStudentProfileResponse = (user: UserWithStudentProfile): StudentProfileResponse => {
  return {
    id: user.id,
    firstName: sanitizeText(user.firstName),
    lastName: sanitizeText(user.lastName),
    gender: user.gender,
    university: user.studentProfile?.university
      ? {
          id: user.studentProfile.university.id,
          name: user.studentProfile.university.name,
        }
      : null,
    faculty: user.studentProfile?.faculty ? sanitizeText(user.studentProfile.faculty) : null,
    academicYear: user.studentProfile?.academicYear || null,
  };
};

export const toUniversityResponse = (university: University): UniversityResponse => {
  return {
    id: university.id,
    name: university.name,
  };
};
