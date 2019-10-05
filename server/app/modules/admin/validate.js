import Joi from '@hapi/joi';


export const validateRegistration = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin'),
    phone: Joi.string()
  });
  Joi.validate(req.body, schema, (err) => {
    if (err === null) {
      next();
    } else {
      res.json({
        message: 'Something error',
      });
    }
  });
};

export const validateAdmin = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin'),
    phone: Joi.string()
  });
  Joi.validate(req.body, schema, (err) => {
    if (err === null) {
      next();
    } else {
      next(err);
    }
  });
};