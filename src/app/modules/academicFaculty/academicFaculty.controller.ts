import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully!!',
      data: result,
    });
  },
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAcademicFacultyFromDB();
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty retrived successfully!!',
      data: result,
    });
  },
);

// get academ
const getAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getAcademicFacultyByIdFromDB(facultyId);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty retrived by id successfully!!',
      data: result,
    });
  },
);
// update academic faculty
const updateAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.updateAcademicFacultyByIdIntoDB(
        facultyId,
        req.body,
      );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty updated by id successfully!!',
      data: result,
    });
  },
);
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFacultyById,
};
