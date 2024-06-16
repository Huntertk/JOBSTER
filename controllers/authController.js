import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";


export const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
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