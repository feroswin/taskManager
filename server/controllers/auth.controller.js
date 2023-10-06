import {connection} from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class AuthController {

    async login (req, res) {
        try {
            const {username, password} = req.body
            const [data] = await connection.query("select username, password from user where username = ?", [username])
            const user = data[0]
            if (!user)
                throw new Error("Неверный логин или пароль")

            if (!bcrypt.compareSync(password, user.password))
                throw new Error("Неверный пароль")

            let accessToken = jwt.sign({username: user.username}, process.env.SECRET_KEY, {expiresIn: "30m"})
            let refreshToken = jwt.sign({username: user.username}, process.env.SECRET_KEY, {expiresIn: "3h"})
            res.json({
                username: user.username,
                accessToken,
                refreshToken
            })

        }
        catch (e) {
            return res.json({
                response: false,
                description: e.message
            })
        }
    }

    async register (req, res) {

        try {
            const {username, password} = req.body
            const [candidate] = await connection.query("select username from user where username = ?", [username])
            if (candidate[0])
                throw new Error("Пользователь с таким именем уже существует")

            const hashPassword = bcrypt.hashSync(password, 10)

            await connection.query("insert into user (username, password)  values(?,?)", [username, hashPassword])
            res.json({
                response: true,
                description: "Пользователь успешно создан"
            })
        }
        catch (e) {
            return res.json({
                response: false,
                description: e.message
            })
        }
    }
}

export default new AuthController()