import { prisma } from '~/lib/prisma';
import { UserRole } from '@prisma/client';

export const authRepository = {
  findUserByPhone: async (phone: string) => {
    return prisma.user.findUnique({
      where: { phone },
      include: {
        studentProfile: true,
        ownerProfile: true,
      },
    });
  },

  findUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        ownerProfile: true,
      },
    });
  },

  createUser: async (data: {
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE';
    role: UserRole;
    phoneVerifiedAt: Date;
  }) => {
    return prisma.user.create({
      data: {
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        role: data.role,
        phoneVerifiedAt: data.phoneVerifiedAt,
        lastLoginAt: new Date(),
      },
      include: {
        studentProfile: true,
        ownerProfile: true,
      },
    });
  },

  updateLastLogin: async (userId: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  },
};
