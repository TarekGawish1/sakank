import { prisma } from '~/lib/prisma';
import { User } from '@prisma/client';
import { SignupInput } from './auth.validator';

export const authRepository = {
  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        ownerProfile: true,
      },
    });
  },

  findUserByPhone: async (phone: string) => {
    return prisma.user.findUnique({
      where: { phone },
    });
  },

  findUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: { include: { university: true } },
        ownerProfile: true,
      },
    });
  },

  findUserByVerificationToken: async (token: string) => {
    return prisma.user.findUnique({
      where: { verificationToken: token },
    });
  },

  createUser: async (
    data: SignupInput,
    hashedPassword: string,
    verificationToken: string
  ): Promise<User> => {
    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        role: data.role,
        verificationToken,
      },
    });
  },

  updateUserLastLogin: async (id: string) => {
    return prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  },

  markEmailAsVerified: async (id: string) => {
    return prisma.user.update({
      where: { id },
      data: {
        emailVerifiedAt: new Date(),
        verificationToken: null,
      },
    });
  },
};
