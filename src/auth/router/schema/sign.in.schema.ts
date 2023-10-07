import Joi, { Schema }from "joi"

export const signInSchema: any = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
