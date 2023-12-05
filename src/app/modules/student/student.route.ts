import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();

router.get('/', StudentController.getAllStudent);
router.put('/:studentId', StudentController.deleteStudentById);

export const StudentRoute = router;
