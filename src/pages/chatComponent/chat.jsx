import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { Messages } from './messages'
import { Input } from './input'
import styled from 'styled-components'

const ChatStyled = styled.div`
    box-sizing: border-box;
    width: 70%;
    border-radius: 20px 40px 40px 20px;
    background-color: white;
    margin: 20px 20px 20px 0px;
    padding: 10px;

    @media (max-width: 1024px) {
        width: 100%;
        border-radius: 20px;
        margin: 0;
    }
`

export const Chat = () => {
    const { data } = useContext(ChatContext)

    return (
        <ChatStyled>
            {data.user.displayName ? (
                <>
                    <span>Чат с {data.user?.displayName}</span>

                    <Messages />
                    <Input />
                </>
            ) : (
                <div>
                    <h1>Выберите пользователя</h1>
                </div>
            )}
        </ChatStyled>
    )
}
