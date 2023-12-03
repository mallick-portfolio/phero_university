import { Router } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validator';
import validateSchema from '../../middlewares/validateSchema';

const router = Router();

router.post(
  '/create-student',
  validateSchema(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoute = router;
