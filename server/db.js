import mysql from "mysql2"

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "taskmanager"
}).promise()
