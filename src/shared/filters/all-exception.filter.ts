/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as HttpStatusCode from 'http-status-codes';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const res = {
      success: false,
      status,
      message: HttpStatusCode.getStatusText(status),
      error: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };  

    // Joi validation error
    if (res.error && res.error.errors) {
      res.error = res.error.errors;
    }

    // Nest.js exceptional error
    if (res.error && res.error.statusCode) {
      res.error = res.error.error;
    }

    // if unauthorized than change message
    if (res.status == HttpStatus.UNAUTHORIZED) {
      res.error = 'Please login to continue';
    }

    response.status(status).json(res);
  }
}
