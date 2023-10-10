import {connection} from "../db.js";
import {getFormatDate} from "../helpers/formatDate.js";
import * as readline from "readline";

class TaskController {

    async getTasks (req, res) {
        try {
            const {id_user} = req.user
            // console.log(req.slices)
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

            const result = await connection.query(sql, [req.user.id_user, title, description, getFormatDate(new Date()), deadline])
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
            const [result] = await connection.query(`update task set title = ?, description = ?, deadline = ?,  is_complete = ? where id_task = ? and id_user = ?`, [title, description, ((!deadline) ? null: deadline), is_complete, idTask, idUser])
            // console.log(result)
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

    async getOneTask(req, res) {
        try {
            const idTask = req.params.id
            const idUser = req.user.id_user
            const [result] = await connection.query("select title, description, created_at, DATE_FORMAT(deadline, '%Y-%m-%d') as deadline, is_complete from task where id_user = ? and id_task = ?", [idUser, idTask])
            if (!result.length) {
                return res.json({
                    response: false,
                    message: "Задача с таким id не найдена"
                })
            }
            return res.json({
                response: true,
                data: {
                    ...result[0],
                    is_complete: Boolean(result[0].is_complete)
                }
            })
        }
        catch (e) {

        }


    }
}

export default new TaskController()