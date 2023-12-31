import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// get all
const getAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};
// get single
const getAcademicFacultyByIdFromDB = async (id: string) => {
  if (await AcademicFaculty.isFacultyExistWithTheId(id)) {
    const result = await AcademicFaculty.findOne({ facultyId: id });
    return result;
  }
};

// create
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// update
const updateAcademicFacultyByIdIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  if (await AcademicFaculty.isFacultyExistWithTheId(id)) {
    const result = await AcademicFaculty.findOneAndUpdate(
      { facultyId: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  }
};
// update
const deleteAcademicFacultyByIdIntoDB = async (id: string) => {
  if (await AcademicFaculty.isFacultyExistWithTheId(id)) {
    const result = await AcademicFaculty.findOneAndUpdate(
      { facultyId: id },
      { isDeleted: true },
      {
        new: true,
      },
    );
    return result;
  }
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultyFromDB,
  updateAcademicFacultyByIdIntoDB,
  getAcademicFacultyByIdFromDB,
  deleteAcademicFacultyByIdIntoDB,
};
