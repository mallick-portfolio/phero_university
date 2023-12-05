import { Router } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validator';
import validateSchema from '../../middlewares/validateSchema';
import { AcademicFacultyValidations } from '../academicFaculty/academicFaculty.validation';
import { AcademicFacultyControllers } from '../academicFaculty/academicFaculty.controller';
import { AdminValidationSchema } from '../admin/admin.validation';

const router = Router();

router.post(
  '/create-student',
  validateSchema(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-admin',
  validateSchema(AdminValidationSchema.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/create-academic-faculty',
  validateSchema(
    AcademicFacultyValidations.createAcademicFacultySchemaValidation,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

export const UserRoute = router;
