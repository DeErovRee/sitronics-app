import React from 'react'
import {
    Routes, 
    Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux'

import { MessageArray } from './messageArray';
import { Form } from './form'

export const MessageField = () => {

    let chats = useSelector(state => state.chats.chatList)

    if (chats === undefined) {
        return chats = []
    } 
    
    return(
            <div className='messageList'>
                <Routes className='chatUser'>
                    {
                        chats.map((el, ind) => {
                        return(<Route 
                            path={`/chat${ind}`}
                            element={
                                <>
                                    <h1>Чат c {el.name}</h1>
                                    <MessageArray 
                                        chatId={chats.indexOf(chats[ind])}/>
                                    <Form
                                        chatId={ind}></Form>
                                </>
                            }
                            key={ind}/>)
                        })
                    }
                </Routes>
            </div>
    )
}