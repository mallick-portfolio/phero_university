import { Schema, model } from 'mongoose';

import {
  AcademicDepartmentModel,
  TAcademicDepartment,
} from './academicDepartment.interface';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<
  TAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name });
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Department name already exist with that name',
    );
  }
  next();
});

// statics method
academicDepartmentSchema.statics.isDepartmentExistWithTheId = async function (
  id: string,
) {
  const isExist = await AcademicDepartment.findById(id);
  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Department not found with this id',
    );
  }
  return true;
};

export const AcademicDepartment = model<
  TAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
