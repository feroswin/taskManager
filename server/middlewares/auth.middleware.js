import jwt from "jsonwebtoken";

export default function (req, res, next) {

    try {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization?.split(' ')[1]

        if(!token)
            return res.status(401).json({
                response: false,
                message: "Пользователь не авторизован"
            })

        const decodeData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodeData
        next()
    }
    catch (e) {
        return res.status(401).json({
            response: false,
            message: e.message
        })
    }

}