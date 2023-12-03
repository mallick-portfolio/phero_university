import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all academic semester
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterFromDB();
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester get successfully',
      data: result,
    });
  },
);
// get  academic semester by id
const getAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.getAcademicSemesterByIdFromDB(
      req.params.id,
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester get successfully',
      data: result,
    });
  },
);

// create academic semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const resutl = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester created successfully!!!',
      data: resutl,
    });
  },
);

// get  academic semester by id
const updateAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await AcademicSemesterServices.updateAcademicSemesterByIdIntoDB(
        id,
        req.body,
      );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester update successfully',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemesterById,
};
