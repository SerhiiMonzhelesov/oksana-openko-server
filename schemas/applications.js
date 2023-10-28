const Joi = require("joi");
const {
  servicesList,
  formatList,
} = require("../constants/application-constants");
const { PHONE_REGEXP } = require("../constants/regexp");

const addApplicationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": '"name" must be a string',
    "string.empty": '"name" is not allowed to be empty',
    "string.min": '"name" length must be at least {#limit} characters long',
    "string.max":
      '"name" length must be less than or equal to {#limit} characters long',
    "any.required": "missing required name field",
  }),

  phone: Joi.string().trim().required().regex(PHONE_REGEXP).messages({
    "string.base": '"phone" must be a string',
    "string.empty": '"phone" is not allowed to be empty',
    "any.required": '"phone" is required',
    "string.pattern.base": '"phone" must be a valid phone number',
  }),
  service: Joi.string()
    .valid(...servicesList)
    .required()
    .messages({
      "string.base": '"Service type" must be a string',
      "string.empty": '"Service type" is not allowed to be empty',
      "any.required": '"Service type" is required',
      "any.only": `Service can only be of the following types: ${servicesList} `,
    }),
  format: Joi.string()
    .valid(...formatList)
    .required()
    .messages({
      "string.base": '"Format" must be a string',
      "string.empty": '"Format" field is not allowed to be empty',
      "any.required": '"Format" field is required',
      "any.only": `Format can only be of the following types: ${formatList} `,
    }),
  question: Joi.string().min(0).max(1000).messages({
    "string.min": `"question" should have a minimum length of {#limit}`,
    "string.max": `"question" should have a maximum length of {#limit}`,
  }),
});

module.exports = {
  addApplicationSchema,
};
