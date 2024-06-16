import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/customErrors.js";


export const register = async (req, res, next) => {
    try {
        const userExist = await User.findOne({email:req.body.email})
        if(userExist){
            return next(new BadRequestError("User already exist"))
        }
        const user = await User.create(req.body);
        res.status(StatusCodes.CREATED).json({msg:"user register successfully", user})
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