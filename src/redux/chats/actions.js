export const ADD_CHAT = 'CHATS::ADD_CHAT'
export const DEL_CHAT = 'CHATS::DEL_CHAT'

export const addChat = (name) => ({
    type: ADD_CHAT,
    name,
})

export const delChat = (name, ind) => ({
    type: DEL_CHAT,
    name,
    ind,
})