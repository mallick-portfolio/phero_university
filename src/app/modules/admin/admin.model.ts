import { Schema, model } from 'mongoose';
import { TAdmin, TName } from './admin.interface';
const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: nameSchema,
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presendAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Admin = model<TAdmin>('Admin', adminSchema);
