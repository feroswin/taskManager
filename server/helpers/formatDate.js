
export function getFormatDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth().toString().padStart(2, 0)
    const day = date.getDate().toString().padStart(2, 0)
    const hour = date.getHours().toString().padStart(2, 0)
    const minute = date.getMinutes().toString().padStart(2, 0)
    const seconds = date.getSeconds().toString().padStart(2, 0)

    return `${year}.${month}.${day} ${hour}:${minute}:${seconds}`
}