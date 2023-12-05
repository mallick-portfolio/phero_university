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
  const initialId = '0001';
  const lastAcademicFacult = await AcademicFaculty.find()
    .sort({
      createdAt: -1,
    })
    .limit(1);
  const lastAcademicFacultId =
    Number(lastAcademicFacult[0]?.facultyId?.split('-')[1]) + 1 || initialId;
  const currentAccademicFacultyId = lastAcademicFacultId
    .toString()
    .padStart(4, '0');

  payload.facultyId = `F-${currentAccademicFacultyId}`;
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
