import { Types } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};
export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  designation: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  presendAddress: string;
  permanentAddress: string;
  profileImage?: string;
  managementDepartment: Types.ObjectId;
  isDeleted: boolean;
};
