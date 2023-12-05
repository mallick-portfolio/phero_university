import { z } from 'zod';

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      designation: z.string(),
      email: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presendAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      managementDepartment: z.string(),
    }),
  }),
});

export const AdminValidationSchema = {
  createAdminValidationSchema,
};
