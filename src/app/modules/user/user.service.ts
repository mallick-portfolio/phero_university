/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || config.default_password;

  const admisstionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.role = 'student';
    if (admisstionSemester) {
      user.id = await generateStudentId(admisstionSemester);
    }
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    payload.user = newUser[0]._id;
    payload.id = newUser[0].id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const user: Partial<TUser> = {};
  user.role = 'admin';

  user.id = await generateAdminId();
  user.password = password || config.default_password;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([user], { session });
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }
    payload.user = newUser[0]?._id;
    payload.id = newUser[0]?.id;
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const user: Partial<TUser> = {};
  user.role = 'faculty';

  user.id = await generateFacultyId();
  user.password = password || config.default_password;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([user], { session });
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }
    payload.user = newUser[0]?._id;
    payload.id = newUser[0]?.id;
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
