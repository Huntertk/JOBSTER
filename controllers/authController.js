import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
    try {
        const userExist = await User.findOne({email:req.body.email})
        if(userExist){
            return next(new BadRequestError("User already exist"))
        }
        const isFirstAccount = await User.countDocuments();
        if(isFirstAccount === 0){
            req.body.role ='admin'
        } else {
            req.body.role ='user'
        }
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
        await User.create(req.body);
        res.status(StatusCodes.CREATED).json({msg:"user register successfully"})
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(new UnauthenticatedError("Wrong Credentials"))
        }

        const isPasswordCorrect = await comparePassword(req.body.password, user.password);

        if(!isPasswordCorrect){
            return next(new UnauthenticatedError("Wrong Credentials"))
        }
        const token = createJWT({userId: user._id, role:user.role})
        res.status(StatusCodes.OK).json({msg:"user login successfully", token})
    } catch (error) {
        next(error)
    }
}