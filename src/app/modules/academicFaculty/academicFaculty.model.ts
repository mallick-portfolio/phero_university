import { ObjectId, Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  TAcademicFaculty,
} from './academicFaculty.interface';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<
  TAcademicFaculty,
  AcademicFacultyModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({ name: this.name });
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty name already exist with that name',
    );
  }
  next();
});

// statics method
academicFacultySchema.statics.isFacultyExistWithTheId = async function (
  id: ObjectId,
) {
  const isExist = await AcademicFaculty.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found with this id');
  }
  return true;
};

export const AcademicFaculty = model<TAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema,
);
