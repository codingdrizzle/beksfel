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

export const EditProfileSchema = Joi.object({
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),
})

export const InvoiceSchema = Joi.object({
    _id: Joi.string().optional(),
    invoice_number: Joi.number().required(),
    project_name: Joi.string().required(),
    project_location: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').default('pending'),
    items: Joi.array().items(Joi.object({
        _id: Joi.string().optional(),
        description: Joi.string().required().messages({
            'string.empty': 'Description must not be empty',
            'string.base': 'Description must be alphanumeric',
        }),
        quantity: Joi.number().invalid(0).required().messages({
            'any.required': 'Quantity must not be empty',
            'number.base': 'Quantity must be a number',
            'any.invalid': 'Quantity cannot be zero',
        }),
        unit: Joi.string().required().messages({
            'string.empty': 'Unit must not be empty',
            'string.base': 'Unit must include alphabets',
        }),
        rate: Joi.number().invalid(0).required().messages({
            'any.required': 'Rate must not be empty',
            'number.base': 'Rate must be a number',
            'any.invalid': 'Rate cannot be zero',
        }),
        amount: Joi.number().invalid(0).required().messages({
            'any.required': 'Amount must not be empty',
            'number.base': 'Amount must be a number',
            'any.invalid': 'Amount cannot be zero',
        }),
    })).required(),
    total: Joi.number().invalid(0).required().messages({
        'any.required': 'Total must not be empty',
        'number.base': 'Total must be a number',
        'any.invalid': 'Total cannot be zero',
    }),
    invoice_by: Joi.string().required(),
    approved_by: Joi.string(),
    created_by: Joi.string(),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional(),
    __v: Joi.any().optional(),
});

export const PaymentSchema = Joi.object({
    pv_number: Joi.number().required(),
    date: Joi.date().iso().required(),
    payment_type: Joi.string().required(),
    cheque_number: Joi.when('payment_type', {
        is: 'bank',
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional(),
    }),
    bank_name: Joi.when('payment_type', {
        is: 'bank',
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional(),
    }),    tin_number: Joi.string().allow('').optional(),
    invoice_id: Joi.string().required(),
    tax_amount: Joi.number().required(),
    tax_percent: Joi.string().required(),
    gross_amount: Joi.number().required(),
    net_amount: Joi.number().required(),
    amount_received: Joi.number().required(),
    balance: Joi.number().required(),
});

export const IncomeSchema = Joi.object({
    siteName: Joi.string().required().messages({
        'string.empty': 'Site name must not be empty',
        'string.base': 'Site name must include alphabets',
    }),
    date: Joi.date().iso().required(),
    amount: Joi.number().required()
});
