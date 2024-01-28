import {body, param, validationResult} from 'express-validator';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '../errors/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/jobModels.js';
import User from '../models/userModels.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues, 
        (req, res, next) => {
            const errors = validationResult(req)
            console.log(errors);
            if(!errors.isEmpty()){
                const errorMessage = errors.array().map((error) => error.msg)
                if(errorMessage[0].startsWith('No Job')){
                    throw new NotFoundError(errorMessage[0])
                }
                if(errorMessage[0].startsWith('You are')){
                    throw new UnAuthorizedError(errorMessage[0])
                }
                throw new BadRequestError(errorMessage[0])
            }
            next()  
        },
    ]
};


export const validateJob = withValidationErrors([
    body('company')
    .notEmpty()
    .withMessage("Please Provide company name"), 

    body('position')
    .notEmpty()
    .withMessage("Please Provide position name"),

    body('jobLocation')
    .notEmpty()
    .withMessage("Please Provide Job Location"),

    body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status values"), 
    
    body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid job type"), 
],)

export const validateIdParam = withValidationErrors([
    param('id').custom(async(value,{req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if(!isValidId) {
            throw new BadRequestError('invalid mongodb id')
        }

        const job = await Job.findById(value)
    if(!job){
        throw new NotFoundError(`No Job Found in this ${value}`)
    }
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === job.createdBy.toString()
    if(!isAdmin && !isOwner){
        throw new UnAuthorizedError("You are not authorized")
    }
    console.log(req);
    })
])

export const validateRegisterInput = withValidationErrors([
    body('name')
    .notEmpty()
    .withMessage("Please Provide name"),
    body('lastName')
    .notEmpty()
    .withMessage("Please Provide lastName"),
    body('email')
    .notEmpty()
    .withMessage("Please Provide email")
    .isEmail()
    .withMessage('Please Provide Valid Email')
    .custom(async(email) => {
        const user = await User.findOne({email})
        if(user){
            throw new BadRequestError("User Already Registered")
        }
    }),
    body('password')
    .notEmpty()
    .withMessage("Please Provide password")
    .isLength({min:8})
    .withMessage("Password Must be at least 8 character long"),
    body('location')
    .notEmpty()
    .withMessage("Please Provide Location")
])


export const validateLoginInput = withValidationErrors([
    body('email')
    .notEmpty()
    .withMessage("Please Provide email")
    .isEmail()
    .withMessage('Please Provide Valid Email'),

    body('password')
    .notEmpty()
    .withMessage("Please Provide password")
])


export const validateUpdateUserInput = withValidationErrors([
    body('name')
    .notEmpty()
    .withMessage("Please Provide name"),
    body('lastName')
    .notEmpty()
    .withMessage("Please Provide lastName"),
    body('email')
    .notEmpty()
    .withMessage("Please Provide email")
    .isEmail()
    .withMessage('Please Provide Valid Email')
    .custom(async(email, {req}) => {
        const user = await User.findOne({email})
        if(user && user._id.toString() !== req.user.userId){
            throw new BadRequestError("User Already Registered")
        }
    }),
    body('location')
    .notEmpty()
    .withMessage("Please Provide Location")
])
