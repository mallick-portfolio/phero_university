import { Router } from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateSchema from '../../middlewares/validateSchema';
import { AcademicFacultyValidations } from './academicFaculty.validation';

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
router.delete(
  '/:facultyId',
  AcademicFacultyControllers.deleteAcademicFacultyById,
);

export const AcademicFacultyRouters = router;
