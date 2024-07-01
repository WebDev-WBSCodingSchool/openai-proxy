import ErrorResponse from '../utils/ErrorResponse.js';

const validateMode = (req, res, next) => {
  const {
    headers: { mode }
  } = req;
  if (!['production', 'development'].includes(mode)) {
    throw new ErrorResponse('Only valid values for mode are "production" or "development"', 400);
  }
  return next();
};

export default validateMode;
