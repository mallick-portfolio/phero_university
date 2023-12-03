import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);

// hash password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.salt_password),
  );
  next();
});
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: false });
  next();
});
userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: false });
  next();
});

// static method
userSchema.statics.isUserExists = async function (id: string) {
  const user = await User.findOne({ id });
  return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
