import { ApiResponse } from '../utils/apiResponse.js';
import { ENV } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid resource identifier for field '${err.path}'.`;
  }

  // Handle Mongoose duplicate key error (11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `A record with this ${field} already exists.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'Uploaded file exceeds maximum permitted file size.';
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired';
  }

  // Handle CORS errors
  if (err.message && err.message.includes('CORS')) {
    statusCode = 403;
    message = 'Cross-Origin Request Blocked by server policy.';
  }

  // Always log internal server errors on backend console
  if (statusCode === 500 || ENV.NODE_ENV !== 'production') {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);
  }

  // Mask internal 500 errors from clients in production
  if (ENV.NODE_ENV === 'production' && statusCode === 500) {
    message = 'An unexpected server error occurred. Please contact support.';
    errors = null;
  }

  return ApiResponse.error(res, {
    statusCode,
    message,
    errors,
  });
};

export const notFoundHandler = (req, res) => {
  return ApiResponse.error(res, {
    statusCode: 404,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
};
