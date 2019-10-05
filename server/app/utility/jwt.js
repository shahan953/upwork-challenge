import { verify, sign } from 'jsonwebtoken';
import config from 'config';

const secret = config.get('secret');

const jwtVerify = token => new Promise((resolve, reject) => {
  verify(token.replace('JWT ', ''), secret, (err, decoded) => {
    if (err || !decoded) {
      reject(err);
    }
    resolve(decoded);
  });
});

const generateJwt = data => sign(data, secret, { expiresIn: '12h' });


export {
  jwtVerify,
  generateJwt
};
