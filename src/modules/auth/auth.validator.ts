import * as Joi from '@hapi/joi';
export default class AuthSchemas {
   
    // Rest Password schema
    public static RESETPASS = Joi.object({
      token: Joi.string()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .min(1)
        .required(),
    });

    //login schema
    public static LOGIN = Joi.object({
      email: Joi.string()
        .lowercase()
        .email({ minDomainSegments: 2 })
        .trim()
        .strict()
        .label('Email')
        .required(),
      password: Joi.string()
        .trim()
        .strict()
        .min(6)
        .max(18)
        .label('Password')
        .required()
    });

    public static FORGOTPASS = Joi.object({
      email: Joi.string()
        .lowercase()
        .email({ minDomainSegments: 2 })
        .trim()
        .strict()
        .label('Email')
        .required(),
    });

    //Add user schema
    public static SIGNUP = Joi.object({
      name: Joi.string()
        .trim()
        .regex(/^[a-zA-Z ]*$/)
        .min(1)
        .max(20)
        .strict()
        .label('Name')
        .required(),
      email: Joi.string()
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2 })
        .max(30)
        .strict()
        .label('Email')
        .required(),
      password: Joi.string()
        .trim()
        .strict()
        .min(6)
        .max(18)
        .label('Password')
        .required(),
      company_name: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .strict()
        .label('Company Name')
        .required(),
      website_url: Joi.string()
        .optional()
        .allow('', null),
      address: Joi.string()
        .trim()
        .required(),
      mobile_number: Joi.string()
        .trim()
        .min(1)
        .required()
        .regex(/^[0-9 ]*$/),
      mobile_dial_code: Joi.string()
        .trim()
        .min(1)
        .required(),
      mobile_country_code: Joi.string()
        .trim()
        .min(1)
        .required(),
      phone_number: Joi.string()
        .trim()
        .min(1)
        .required()
        .regex(/^[0-9 ]*$/),
      fax_number: Joi.string()
        .trim()
        .min(1)
        .required(),
      cr_number: Joi.string()
        .trim()
        .min(1)
        .required(),
      cr_expiry_date: Joi.date()
        .required(),
      cr_incorporation_date: Joi.date()
        .required(),
      cpr_number: Joi.string()
        .min(1)
        .required(),
      category: Joi.array().items(Joi.number())
        .required(),
      user_role: Joi.string()
        .required()
    });

}