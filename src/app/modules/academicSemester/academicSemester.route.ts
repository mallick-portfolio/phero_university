import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateSchema from '../../middlewares/validateSchema';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.post(
  '/create-academic-semester',
  validateSchema(AcademicSemesterValidation.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);
// get academic semester by id
router.get('/:id', AcademicSemesterControllers.getAcademicSemesterById);
router.put(
  '/:id',
  validateSchema(AcademicSemesterValidation.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateAcademicSemesterById,
);
export const AcademicSemesterRoutes = router;
