import { z } from 'zod';

const createAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be stinr',
    }),
  }),
});
const updateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be stinr',
    }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultySchemaValidation,
  updateAcademicFacultySchemaValidation,
};
