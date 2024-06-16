import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/customErrors.js";
import bcrypt from "bcryptjs";

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
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
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