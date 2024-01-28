import { StatusCodes } from "http-status-codes"

import User from '../models/userModels.js'
import { comparePasword, hashPassword } from "../utils/passwordUtils.js"
import { UnAuthenticatedError } from "../errors/customError.js"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount?'admin':'user'
    
    req.body.password = await hashPassword(req.body.password)
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:"user created"})
}
export const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new UnAuthenticatedError("Wrong Credentials")
    }
    const isPasswordCorrect = await comparePasword(password, user.password) 
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError("Wrong Credentials")
    }

    const token = createJWT({userId: user._id, role: user.role})
    res.status(StatusCodes.OK).cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000*60*60*24),
        secure: process.env.NODE_ENV === 'production'
    }).json({msg: "User Logged In"})
}


export const logout = async (req, res) => {
    res.clearCookie('token').json({msg:"User Logout Successfully"})
}