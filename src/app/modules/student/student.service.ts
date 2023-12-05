import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleField } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // 1 first search filter
  // 2 query filter
  // 3 sort filter
  // 4 limit filter
  // 5 pagination calculation
  // pagination rule
  // (page - 1) * limit
  // const queryObj = { ...query };

  // const excludeField = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  // excludeField.forEach((field) => delete queryObj[field]);

  // // {email: {$regex: searchItem, $options: 'i'}}
  // // { email: { $regex : query.searchTerm , $options: i}}

  // let sort;
  // let limit = 1;
  // let page = 1;
  // let fields = '-__v';
  // let searchItem = '';
  // if (query?.searchTerm) {
  //   searchItem = query?.searchTerm as string;
  // }
  // if (query?.fields) {
  //   fields = (query?.fields as string)?.split(',')?.join(' ');
  // }
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // if (query.limit) {
  //   limit = Number(query.limit) as number;
  // }
  // if (query.page) {
  //   page = Number(query.page) as number;
  // }
  // const skipRoule = (page - 1) * limit;

  // const studentSearchAbleField = ['email', 'name.firstName', 'presentAddress'];
  // const searchQuery = Student.find({
  //   $or: studentSearchAbleField.map((field) => ({
  //     [field]: {
  //       $regex: searchItem,
  //       $options: 'i',
  //     },
  //   })),
  // })
  // const filterQuery = searchQuery.find(queryObj);
  // const sortQuery = filterQuery.sort(sort);

  // const skipQuery = sortQuery.skip(skipRoule);
  // const limitQuery = skipQuery.limit(limit as number);
  // const filedQuery = await limitQuery.select(fields);

  const StudentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester', 'name code year startMonth endMonth')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .searchQuery(studentSearchAbleField)
    .fileds()
    .filter()
    .paginate()
    .fileds();

  const results = StudentQuery.modelQuery;
  return results;
};

// delete student by id
const deleteStudentByIdFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isDeletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!isDeletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const isUserDeleted = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!isUserDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return isDeletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  deleteStudentByIdFromDB,
};
