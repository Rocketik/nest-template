type HttpError = {
  message: string;
  code: number;
};

export const USER_ALREADY_EXISTS: HttpError = {
  message: "User already exists",
  code: 4001
};

export const NOT_AUTHENTICATED: HttpError = {
  message: "Not authenticated",
  code: 4010
};

export const ITEMS_NOT_FOUND: HttpError = {
  message: "Items not found",
  code: 4041
};

export const ITEM_NOT_FOUND: (item?: string) => HttpError = (item = "Item") => ({
  message: `${item} not found`,
  code: 4042
});
export const ITEM_NOT_ALLOWED: (item: string) => HttpError = (item = "Item") => ({
  message: `${item} not allowed`,
  code: 4067
});

export const VALIDATION_ERROR: (message?: string) => HttpError = (message = "Validation error") => ({
  message,
  code: 4061
});

export const UNIQUE_ERROR: (item: string, key: string) => HttpError = (item, key) => ({
  message: `${item} has already exists`,
  code: 4062,
  unique_key: key
});

export const CANT_SEND_EMAIL: (reciever: string) => HttpError = reciever => ({
  message: `Can't send email to ${reciever}`,
  code: 5001
});

export const PRISMA_ERROR: (message?: string) => HttpError = (message = "Unknown Error") => ({
  message,
  code: 5005
});

export const FORBIDDEN: HttpError = {
  message: "Forbidden",
  code: 4030
};

export const WRONG_PARAMS: HttpError = {
  message: "Wrong params",
  code: 4060
};

export const INTERNAL_SERVER_ERROR: HttpError = {
  message: "Internal server error",
  code: 5000
};

export const PRISMA_UNIQUE_ERROR = "P2002";
