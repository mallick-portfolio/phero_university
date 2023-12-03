import { z } from 'zod';

const createAcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be stinr',
    }),
    academicFaculty: z.string(),
  }),
});
const updateAcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be stinr',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentSchemaValidation,
  updateAcademicDepartmentSchemaValidation,
};
