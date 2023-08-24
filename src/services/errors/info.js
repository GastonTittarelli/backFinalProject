export const generateUserErrorInfo = user => {
    let userInfo = `Uno o mas parametros no son validos:
    - first_name: necesita recibir un String, recibió: ${user.first_name}
    - last_name: necesita recibir un String, recibió: ${user.last_name}
    - email: necesita recibir un String, recibió: ${user.email}`

    return userInfo;
}

export const generateUidErrorInfo = uid => {
    return `- El uid debe ser un numero, recibió: ${uid}`
}