import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  updated: { type: Date, default: Date.now },
});
