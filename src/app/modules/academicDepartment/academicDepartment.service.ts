import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// get all
const getAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty');
  return result;
};
// get single
const getAcademicDepartmentByIdFromDB = async (id: string) => {
  if (await AcademicDepartment.isDepartmentExistWithTheId(id)) {
    const result =
      await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
  }
};

// create
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// update
const updateAcademicDepartmentByIdIntoDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  if (await AcademicDepartment.isDepartmentExistWithTheId(id)) {
    const result = await AcademicDepartment.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  }
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentFromDB,
  updateAcademicDepartmentByIdIntoDB,
  getAcademicDepartmentByIdFromDB,
};
