import express from "express"
import {router as authRouter} from "./routers/auth.router.js";
import {connection} from "./db.js"

let app = express()

let PORT = process.env.PORT || 80

app.use("/", authRouter);

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
