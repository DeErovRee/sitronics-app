import React from 'react'

export const Message = ({author, text, timeStamp}) => {
    return (
        <div className="message">
            <h3>{author}</h3>
            <p className='text'>{text}</p>
            <p className='timeStamp'>{timeStamp}</p>
        </div>
    )
}