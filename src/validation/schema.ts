import Joi from "joi";

export const createNewUserSchema = {
    bodySchema: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required()
    })
}

export const userLoginSchema = {
    bodySchema: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}
