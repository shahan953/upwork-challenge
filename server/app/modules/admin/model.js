import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import { CRUD, generateJwt } from '@util';

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['supper', 'admin', 'user'],
    default: 'user'
  },
  profileimage: {
    type: String
  }
});

adminSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});
adminSchema.methods = {
  _hashPassword(password) {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },
  isMatchedPassword(password) {
    return compareSync(password, this.password);
  },
  toJSON() {
    const user = this.toObject();
    delete user.password;
    return {
      user
    };
  },
  toAuthJSON() {
    const user = this.toObject();
    const token = generateJwt({ uid: user._id });
    delete user.password;
    return {
      token: `JWT ${token}`,
      user
    };
  }

};

adminSchema.plugin(uniqueValidator);
adminSchema.plugin(timestamp);

const adminModel = mongoose.model('Admin', adminSchema);
const adminCrud = new CRUD(adminModel);

export {
  adminModel,
  adminCrud
};
