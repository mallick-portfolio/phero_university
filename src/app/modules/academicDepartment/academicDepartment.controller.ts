import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department created successfully!!',
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.getAcademicDepartmentFromDB();
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department retrived successfully!!',
      data: result,
    });
  },
);

// get academ
const getAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getAcademicDepartmentByIdFromDB(
        departmentId,
      );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department retrived by id successfully!!',
      data: result,
    });
  },
);
// update academic faculty
const updateAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentByIdIntoDB(
        departmentId,
        req.body,
      );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department updated by id successfully!!',
      data: result,
    });
  },
);
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};
