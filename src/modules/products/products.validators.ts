import * as Joi from '@hapi/joi';
export default class ProductSchemas {
   
    // Add Product schema
    public static ADDPRODUCT = Joi.object({
      name: Joi.string()
        .trim()
        .required(),
      price: Joi.number()
        .required(),
    });

    // Add Product schema
    public static EDITPRODUCT = Joi.object({
        name: Joi.string()
          .trim()
          .required(),
        price: Joi.number()
          .required(),
        id: Joi.number()
          .required(),
      });
}