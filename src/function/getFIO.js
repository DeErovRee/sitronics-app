export const getFIO = (user) => {
    const userArr = user.split(' ')
    let FIO = ''
    for (let i = 0; i < userArr.length; i++) {
        FIO += userArr[i].slice(0, 1)
    }

    return FIO.toUpperCase()
}
