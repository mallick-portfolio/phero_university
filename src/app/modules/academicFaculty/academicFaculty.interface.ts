/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAcademicFaculty = {
  name: string;
  facultyId: string;
  isDeleted: boolean;
};

export interface AcademicFacultyModel extends Model<TAcademicFaculty> {
  isFacultyExistWithTheId(id: string): Promise<TAcademicFaculty | null>;
}
