import * as Joi from "@hapi/joi";

export const ConfigModuleDto = {
  isGlobal: true,
  envFilePath: ".env",
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required()
  })
};

export const REQUEST_HAS_ENDED_SUCCESSFULLY = {
  message: "Request has ended successfully"
};
