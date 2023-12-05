import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  const message = 'Validation error';
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default zodErrorHandler;
