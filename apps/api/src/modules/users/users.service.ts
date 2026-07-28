import { NotFoundError } from '~/shared/errors';
import { usersRepository } from './users.repository';
import { UpdateStudentProfileDto, StudentProfileResponse, UniversityResponse } from './users.dto';
import { toStudentProfileResponse, toUniversityResponse } from './users.mapper';

export const usersService = {
  /**
   * Updates the student profile. Creates StudentProfile if it doesn't exist.
   */
  updateStudentProfile: async (
    userId: string,
    dto: UpdateStudentProfileDto,
  ): Promise<StudentProfileResponse> => {
    // Update user-level fields if provided
    const userUpdates: Record<string, unknown> = {};
    if (dto.firstName !== undefined) userUpdates.firstName = dto.firstName;
    if (dto.lastName !== undefined) userUpdates.lastName = dto.lastName;
    if (dto.gender !== undefined) userUpdates.gender = dto.gender;

    if (Object.keys(userUpdates).length > 0) {
      await usersRepository.updateUser(userId, userUpdates as Parameters<typeof usersRepository.updateUser>[1]);
    }

    // Upsert student profile if university info provided
    if (dto.universityId) {
      await usersRepository.upsertStudentProfile(userId, {
        universityId: dto.universityId,
        faculty: dto.faculty,
        academicYear: dto.academicYear,
      });
    }

    // Fetch and return updated profile
    const user = await usersRepository.findUserWithStudentProfile(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    return toStudentProfileResponse(user);
  },

  /**
   * Returns all universities for the dropdown.
   */
  listUniversities: async (): Promise<UniversityResponse[]> => {
    const universities = await usersRepository.findAllUniversities();
    return universities.map(toUniversityResponse);
  },
};
