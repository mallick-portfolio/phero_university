import { Router } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validator';
import validateSchema from '../../middlewares/validateSchema';
import { AdminValidationSchema } from '../admin/admin.validation';
import { FacultyValidationSchema } from '../faculty/faculty.validation';

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
  '/create-faculty',
  validateSchema(FacultyValidationSchema.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

export const UserRoute = router;
