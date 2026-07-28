import { Gender } from '@prisma/client';

export interface UpdateStudentProfileDto {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  universityId?: string;
  faculty?: string;
  academicYear?: string;
}

export interface StudentProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  university: {
    id: string;
    name: string;
  } | null;
  faculty: string | null;
  academicYear: string | null;
}

export interface AvatarUploadDto {
  contentType: string;
  fileName: string;
}

export interface AvatarPresignedUrlResponse {
  uploadUrl: string;
  publicUrl: string;
}

export interface UniversityResponse {
  id: string;
  name: string;
}
