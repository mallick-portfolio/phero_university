import { z } from 'zod';

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
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
      academicDepartment: z.string(),
    }),
  }),
});

export const FacultyValidationSchema = {
  createFacultyValidationSchema,
};
