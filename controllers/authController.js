import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/customErrors.js";
import { hashPassword } from "../utils/passwordUtils.js";

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
        res.send("Login")
    } catch (error) {
        next(error)
    }
}