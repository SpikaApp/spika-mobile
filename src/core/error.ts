import { ApiError } from "aptos";

export const parseError = (error: unknown, defaultResponse: string): ErrorResponse => {
  let response: unknown;
  if (error instanceof ApiError) {
    if (error.message) {
      try {
        const maybeObject = JSON.parse(error.message);
        if (maybeObject && maybeObject.message) {
          response = maybeObject.message;
        } else {
          response = error.message;
        }
      } catch (parsingError) {
        response = error.message;
      }
    }
  } else if (error instanceof Error) {
    response = error.message;
  }
  return {
    error: error,
    message: response,
    defaultResponse: defaultResponse ? defaultResponse : "Generic Error",
  };
};
