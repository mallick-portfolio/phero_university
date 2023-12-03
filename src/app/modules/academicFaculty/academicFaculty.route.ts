import { Router } from 'express';
import validateSchema from '../../middlewares/validateSchema';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = Router();
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
router.post(
  '/create-academic-faculty',
  validateSchema(
    AcademicFacultyValidations.createAcademicFacultySchemaValidation,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyControllers.getAcademicFacultyById);
router.put('/:facultyId', AcademicFacultyControllers.updateAcademicFacultyById);

export const AcademicFacultyRouters = router;
