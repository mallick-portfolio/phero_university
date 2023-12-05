import { Router } from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = Router();
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

router.get('/:facultyId', AcademicFacultyControllers.getAcademicFacultyById);
router.put('/:facultyId', AcademicFacultyControllers.updateAcademicFacultyById);
router.delete(
  '/:facultyId',
  AcademicFacultyControllers.deleteAcademicFacultyById,
);

export const AcademicFacultyRouters = router;
