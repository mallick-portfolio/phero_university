import z from 'zod';
import {
  months,
  academicSemesterNames,
  academicSemesterCodes,
} from './academicSemester.constant';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});
const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z
      .enum([...academicSemesterNames] as [string, ...string[]])
      .optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
