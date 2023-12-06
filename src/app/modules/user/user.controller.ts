import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    message: 'Student created Successfully',
    data: result,
    statusCode: status.OK,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, {
    success: true,
    message: 'Admin created Successfully',
    data: result,
    statusCode: status.OK,
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    success: true,
    message: 'Faculty created Successfully',
    data: result,
    statusCode: status.OK,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
};
