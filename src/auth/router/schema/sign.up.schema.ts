import Joi, {Schema} from "joi"


export const signUpSchema: any = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  department: Joi.string(), 
  role: Joi.string().valid('admin', 'user').default('user'),
});
