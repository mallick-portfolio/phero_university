import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || config.default_password;

  const admisstionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  user.role = 'student';
  if (admisstionSemester) {
    user.id = await generateStudentId(admisstionSemester);
  }
  const newUser = await User.create(user);

  if (Object.keys(newUser).length) {
    payload.user = newUser._id;
    payload.id = newUser.id;
    const result = await Student.create(payload);
    return result;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
