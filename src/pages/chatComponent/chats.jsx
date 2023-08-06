import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { UserChat, UserChatInfo, UserImg, UserName } from './search'
import styled from 'styled-components'

const ChatsStyled = styled.div`
    margin: 0px 0px 20px 20px;

    @media (max-width: 1024px) {
        margin: 0 -15px 0 -15px;
        overflow: scroll;
        display: flex;
        flex-direction: row;
        flex-wrap: no-wrap;
    }
`

export const Chats = ({ client }) => {
    const [chats, setChats] = useState('')

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()

        if (client) {
            handleSelect(client)
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid])

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u })
    }

    return (
        <ChatsStyled>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <UserChat key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <UserImg src={chat[1].userInfo.photoURL} alt='' width='32px' />
                        <UserChatInfo>
                            <UserName>{chat[1].userInfo.displayName}</UserName>
                            <p>{chat[1].lastMessage?.text.substr(0, 12) + '...'}</p>
                        </UserChatInfo>
                    </UserChat>
                ))}
        </ChatsStyled>
    )
}
