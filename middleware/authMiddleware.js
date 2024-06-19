import { UnauthenticatedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token){
            return next(new UnauthenticatedError("Unauthenticated Please login"));
        }

        const decodedData = verifyJWT(token);

        if(!decodedData){
            return next(new UnauthenticatedError("Unauthenticated Please login"));
        }
        req.user = {userId: decodedData.userId, role: decodedData.role}
        next()
    } catch (error) {
        next(error)
    }
}