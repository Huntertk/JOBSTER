import { UnAuthenticatedError, UnAuthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        throw new UnAuthenticatedError("Authentication Invalid")
    }
    try {
        const {userId, role} = verifyJWT(token)
        req.user = {userId, role}
        next()
    } catch (error) {
        throw new UnAuthorizedError("authentication invalid")
    }
}

export const authorizedPermission = (...roles) => {
    return (req, res, next) => {
    console.log(roles);
    if(!roles.includes(req.user.role)){
        throw new UnAuthorizedError("You have no authorized")
    }
        next()
    }
}