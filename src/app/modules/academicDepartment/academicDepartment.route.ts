import { Router } from 'express';
import validateSchema from '../../middlewares/validateSchema';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router = Router();
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.post(
  '/create-academic-department',
  validateSchema(
    AcademicDepartmentValidations.createAcademicDepartmentSchemaValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getAcademicDepartmentById,
);
router.put(
  '/:departmentId',
  AcademicDepartmentControllers.updateAcademicDepartmentById,
);

export const AcademicDepartmentRouters = router;
