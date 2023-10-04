import {connection} from "../db.js";

class AuthController {

    async login (req, res) {
        // const [result] = await connection.query("select * from user")
        // console.log(result)
    }

    async register (req, res) {

    }
}

export default new AuthController()