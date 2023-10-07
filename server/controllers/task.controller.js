import {connection} from "../db.js";
import {getFormatDate} from "../helpers/formatDate.js";

class TaskController {

    async getTasks (req, res) {
        try {
            const {id_user} = req.user
            // console.log(req.user)
            const [data] = await connection.query(`select id_task as id, title, description, created_at, is_complete, deadline from task inner join user on user.id_user = task.id_user where user.id_user = ?`, [id_user])

            if (!data.length)
                return res.json({
                    response: true,
                    message: "У вас нет задач"
                })

            const formattedData = []
            for (let task of data) {
                // console.log(task)
                formattedData.push({
                    ...task,
                    created_at: task.created_at.toLocaleString().split(',')[0],
                    deadline: task.deadline?.toLocaleString().split(',')[0],
                    is_complete: !!task.is_complete
                })
            }

            return res.json({
                response: true,
                data: formattedData
            })

        }
        catch (e) {
            return res.json({
                response: false,
                message: e
            })
        }
    }

    async createTask(req, res) {
        try {
            const {title, description, deadline} = req.body
            if (!title)
                 return res.json({
                     response: false,
                     message: "Заголовок не задан"
                 })
            const sql = "insert into task (id_user, title, description, created_at, deadline) values(?, ?, ?, ?, ?)"

            const result = await connection.query(sql, [req.user.id_user, title, description, getFormatDate(), deadline])
            // console.log(result)

            return res.json({
                response: true,
                message: "Задача успешно создана"
            })
        }
        catch (e) {
            return res.json({
                response: false,
                message: e
            })
        }
    }

    async deleteTask (req, res) {
        try {
            const idTask = req.params.id
            const idUser = req.user.id_user
            // console.log(idTask, idUser)

            const [result] = await connection.query("delete from task where id_task = ? and id_user = ?", [idTask, idUser])
            if (!result.affectedRows)
                return res.json({
                    response: false,
                    message: "Задача не существует"
                })

            return res.json({
                response: true,
                message: "Задача удалена"
            })
        }
        catch (e) {
            return res.json({
                response: false,
                message: e
            })
        }
    }

    async editTask(req, res) {
        try {
            const {title, description, deadline, is_complete} = req.body
            const idTask = req.params.id
            const idUser = req.user.id_user
            const updateFields = []
            const queryParams = []

            description && (updateFields.push('description = ?'), queryParams.push(description));
            deadline && (updateFields.push('deadline = ?'), queryParams.push(deadline));
            is_complete && (updateFields.push('is_complete = ?'), queryParams.push(Number(Boolean(is_complete))));

            const [result] = await connection.query(`update task set title = ? ${updateFields.join(",")} where id_task = ? and id_user = ?`, [title, ...queryParams, idTask, idUser])
            console.log(result)
            if (!result.changedRows)
                return res.json({
                    response: false,
                    message: "Задача не имеет изменений"
                })

            return res.json({
                response: true,
                message: "Задача обновлена"
            })
        }
        catch (e) {
            return res.json({
                response: false,
                message: e
            })
        }
    }
}

export default new TaskController()