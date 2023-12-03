/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}
