export function getCurrentDate(separator = ':') {
    const newDate = new Date()

    const hours = newDate.getHours()
    const minute = newDate.getMinutes()
    const seconds = newDate.getSeconds()

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return `${hours}${separator}${minute}${separator}${seconds}`
}
