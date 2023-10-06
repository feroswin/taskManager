import {connection} from "../db.js";

class TaskController {

    async getTasks (req, res) {
        try {
            const {username} = req.username
            const [data] = await connection.query(`select title, description, created_at from task inner join user on user.id_user = task.id_user where user.username = ?`, [username])

            if (!data.length)
                return res.json({
                    response: true,
                    description: "У вас нет задач"
                })

            const formattedData = []

            for (let task of data) {
                formattedData.push({...task, created_at: task.created_at.toLocaleString().split(",")[0]})
            }

            return res.json({
                response: true,
                data: formattedData
            })

        }
        catch (e) {
            return res.json({
                response: false,
                description: e
            })
        }
    }

    // async createTask(req, res) {
    //     const {}
    // }

}

export default new TaskController()