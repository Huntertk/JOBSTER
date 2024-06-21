import { body, param, validationResult } from 'express-validator';

import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/jobModel.js';
import User from '../models/userModel.js';


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg);
                throw new BadRequestError(errorMessages[0])
            }
            next()
        }
    ] 
}


export const validateJobInput = withValidationErrors([
    body('company')
    .notEmpty()
    .withMessage("company is required"),
    body('position')
    .notEmpty() 
    .withMessage("position is required"),
    body('jobLocation')
    .notEmpty()
    .withMessage("job location is required"),
    body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Job Status"),
    body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid Job Type"),
])

export const validateIdParam = withValidationErrors([
    param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('invalid MongoDB id'),
])

export const validateRegisterInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location')
    .notEmpty()
    .withMessage('location is required'),
  body('lastName')
    .notEmpty()
    .withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
    body('password')
    .notEmpty()
    .withMessage('password is required'),
]);

export const validateOwner = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
    if(!job){
      return next(new BadRequestError(`No Job Found with this id ${req.params.id}`))
    }
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner){
      return next(new BadRequestError(`You are not authorize to access this job`))
    }
    next()
  } catch (error) {
    next(error)
  }
}


export const validateUpdateUserInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);