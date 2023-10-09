import {connection} from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class AuthController {

    async login (req, res) {
        try {
            const {username, password} = req.body
            // console.log(req.body)
            const [data] = await connection.query("select id_user, username, password from user where username = ?", [username])
            const user = data[0]
            if (!user){
                return res.json({
                    response: false,
                    message: "Неверный логин или пароль"
                })
            }


            if (!bcrypt.compareSync(password, user.password))
                return res.json({
                    response: false,
                    message: "Неверный пароль"
                })

            const payload = {username: user.username, id_user: user.id_user}

            let accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.json({
                response: true,
                user: {
                    id: user.id_user,
                    username: user.username,
                    accessToken
                }
            })

        }
        catch (e) {
            return res.json({
                response: false,
                message: e
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

    async getMe (req, res) {
        try {
            const [data] = await connection.query("select id_user, username from user where username = ?", [req.user.username])

            const user = data[0]
            if (!user) {
                return res.json({
                    response: false,
                    message: "Пользователь не найден"
                })
            }

            let payload = {username: user.username, id_user: user.id_user}

            let accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30m"})
            return res.json({
                response: true,
                user: {
                    id: user.id_user,
                    username: user.username,
                    accessToken
                }

            })
        }
        catch (e) {
            return res.json({
                response: false,
                message: "Нет доступа"
            })
        }

    }
}

export default new AuthController()