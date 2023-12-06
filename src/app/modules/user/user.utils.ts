import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); // 0000 by deafult

  const lastStudentId = await findLastStudentId();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastAdmintId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastAdmin?.id ? lastAdmin.id : undefined;
};
export const generateAdminId = async () => {
  const initialId = 1;
  const lastAdminId = await findLastAdmintId();
  const lastAdminIdId = Number(lastAdminId?.split('-')[1]) + 1 || initialId;
  const currentAccademicFacultyId = lastAdminIdId.toString().padStart(4, '0');

  return `A-${currentAccademicFacultyId}`;
};
const findLastFacultyId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastAdmin?.id ? lastAdmin.id : undefined;
};
export const generateFacultyId = async () => {
  const initialId = 1;
  const lastFacultyId = await findLastFacultyId();
  const lastFacultyIdId = Number(lastFacultyId?.split('-')[1]) + 1 || initialId;
  const currentAccademicFacultyId = lastFacultyIdId.toString().padStart(4, '0');

  return `F-${currentAccademicFacultyId}`;
};
