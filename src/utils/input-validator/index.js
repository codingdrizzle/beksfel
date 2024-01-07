const Joi = require('joi');
export { validateInput } from './validator'

const passwordPattern = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'

export const LoginFormSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .regex(RegExp(passwordPattern))
        .min(8)
        .max(32)
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters and must include at least one letter, one number and one special character',
            'string.empty': 'Password must not be empty',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot be greather than 32 characters',
        })
})

export const RegisterFormSchema = Joi.object({
    firstname: Joi.string()
        .required()
        .messages({
            'string.base': 'Firstname must not include numbers',
            'string.empty': 'Firstname is required',
            'any.required': 'Firstname is required',
        }),


    surname: Joi.string()
        .required()
        .messages({
            'string.base': 'Surname must not include numbers',
            'string.empty': 'Surname is required',
            'any.required': 'Surname is required',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),


    password: Joi.string()
        .regex(RegExp(passwordPattern))
        .min(8)
        .max(32)
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters and must include at least one letter, one number and one special character',
            'string.empty': 'Password must not be empty',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot be greather than 32 characters',
        }),

    confirmPassword: Joi.ref('password'),
})

export const OtpInputSchema = Joi.object({
    otp: Joi.string()
        .max(6)
        .required()
        .messages({
            'string.empty': 'Please enter your confirmation code',
            'any.required': 'Otp is required',
        }),
})

export const ForgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),
})

export const ResetPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .regex(RegExp(passwordPattern))
        .min(8)
        .max(32)
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters and must include at least one letter, one number and one special character',
            'string.empty': 'Password must not be empty',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot be greather than 32 characters',
        }),
    confirmNewPassword: Joi.any()
        .valid(
            Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'Passwords must match'
        }),
})