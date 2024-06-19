import { UnauthenticatedError } from "../errors/customErrors.js"

export const authenticateUser = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token){
            return next(new UnauthenticatedError("Unauthenticated Please login"))
        }
        next()
    } catch (error) {
        next(error)
    }
}