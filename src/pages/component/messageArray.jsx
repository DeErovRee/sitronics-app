import React from "react";
import { Message } from "./message";
import { useSelector } from 'react-redux'

export const MessageArray = ({chatId}) => {

    let message = useSelector(state => state.messages.messageList[chatId])
    if (message === undefined) {
        return message = []
    }

    return(
        <>
            {
                message.map((el, ind) => {
                    return(<Message 
                        author={el.author}
                        text={el.message}
                        timeStamp={el.time}
                        key={ind}/>)
                })
            }
        </>
    )
}
