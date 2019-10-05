// import config from 'config';
import { jwtVerify } from '@util';

let payload;
let token;

export const isAuthenticated = async (req, res, next) => {
  token = req.headers.auth;
  if (token) {
    try {
      payload = await jwtVerify(token);
      if (!payload) {
        throw { message: 'Token has expired' };
      }
      // eslint-disable-next-line require-atomic-updates
      req.user = payload;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    res.status(500).json({
      message: 'Please provide Access Token in key: auth'
    });
  }
};