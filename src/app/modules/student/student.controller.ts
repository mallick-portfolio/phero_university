import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFromDB();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student retrived successfully!!!',
    success: true,
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
};
