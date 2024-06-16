export const register = async (req, res, next) => {
    try {
        res.send("Register")
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