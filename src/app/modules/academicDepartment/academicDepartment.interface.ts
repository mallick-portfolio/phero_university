/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFaculty: ObjectId;
};
export interface AcademicDepartmentModel extends Model<TAcademicDepartment> {
  isDepartmentExistWithTheId(id: string): Promise<TAcademicDepartment | null>;
}
