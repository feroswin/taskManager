import {connection} from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class AuthController {

    async login (req, res) {
        try {
            const {username, password} = req.body
            const [data] = await connection.query("select id_user, username, password from user where username = ?", [username])
            const user = data[0]
            if (!user)
                return res.json({
                    response: false,
                    message: "Неверный логин или пароль"
                })

            if (!bcrypt.compareSync(password, user.password))
                return res.json({
                    response: false,
                    message: "Неверный пароль"
                })

            const payload = {username: user.username, id_user: user.id_user}

            let accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30m"})
            let refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "3h"})
            return res.json({
                username: user.username,
                accessToken,
                refreshToken
            })

        }
        catch (e) {
            return res.json({
                response: false,
                message: e.message
            })
        }
    }

    async register (req, res) {

        try {
            const {username, password} = req.body
            const [candidate] = await connection.query("select username from user where username = ?", [username])
            if (candidate[0])
                return res.json({
                    response: false,
                    message: "Пользователь с таким именем уже занят"
                })

            const hashPassword = bcrypt.hashSync(password, 10)

            await connection.query("insert into user (username, password)  values(?,?)", [username, hashPassword])
            return res.json({
                response: true,
                message: "Пользователь успешно создан"
            })
        }
        catch (e) {
            return res.json({
                response: false,
                message: e.message
            })
        }
    }
}

export default new AuthController()