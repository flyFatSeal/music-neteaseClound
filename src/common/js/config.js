export const HOST = process.env.NODE_ENV === 'production'
    ? 'http://101.132.174.26:3000'
    : 'http://localhost:3000'
export const ERR_OK = 200

export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}
