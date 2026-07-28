import { prisma } from '~/lib/prisma';
import { Gender } from '@prisma/client';

export const usersRepository = {
  findUserWithStudentProfile: async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            university: true,
          },
        },
      },
    });
  },

  upsertStudentProfile: async (
    userId: string,
    data: {
      universityId: string;
      faculty?: string;
      academicYear?: string;
    },
  ) => {
    return prisma.studentProfile.upsert({
      where: { userId },
      create: {
        userId,
        universityId: data.universityId,
        faculty: data.faculty,
        academicYear: data.academicYear,
      },
      update: {
        universityId: data.universityId,
        faculty: data.faculty,
        academicYear: data.academicYear,
      },
      include: {
        university: true,
      },
    });
  },

  updateUser: async (
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      gender?: Gender;
    },
  ) => {
    return prisma.user.update({
      where: { id: userId },
      data,
      include: {
        studentProfile: {
          include: {
            university: true,
          },
        },
      },
    });
  },

  findAllUniversities: async () => {
    return prisma.university.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  },
};
