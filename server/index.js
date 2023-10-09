import express from "express"
import {router as authRouter} from "./routers/auth.router.js";
import {connection} from "./db.js"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import {router as taskRouter} from "./routers/task.router.js";
import cors from "cors"

dotenv.config()

let app = express()

let PORT = process.env.PORT || 80

app.use(cors())
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/tasks", taskRouter)



app.listen(PORT, () => {
    try {
        connection.connect(function (err){
            if (err) throw err
            console.log("db connected")
        })

    }
    catch (e) {
        console.log(e.message + "qwrqwrqwrw")
    }
    console.log(`server started on port ${PORT}`)
})
