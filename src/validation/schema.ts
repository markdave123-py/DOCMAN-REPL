import Joi from "joi";

export const createNewUserSchema = {
  bodySchema: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    phoneNumber: Joi.string().required().length(11),
  }),
};

export const userLoginSchema = {
  bodySchema: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
};
