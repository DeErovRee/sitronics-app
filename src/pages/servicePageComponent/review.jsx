import React from 'react'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import { ServiceCard } from '../../styles/generalStyledComponents'

const ReviewCard = styled.div`
    background-color: #1e1e1e;
    border-radius: 20px;
    color: white;
    padding: 10px;
    margin: 0 0 10px 0;

    width: 100%;
    box-sizing: border-box;
`

const P = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    word-break: break-word;
`

const Input = styled.input`
    display: none;
`

export const Review = (review) => 
    <ReviewCard>
        <P><b>{review.review.userName}</b></P>
        <P><p style={{marginRight: '5px'}}>Отзыв на</p><ServiceCard>{review.review.service}</ServiceCard></P>
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1
            return(
                    <label key={nanoid()}>
                        <Input 
                            type='radio'
                            name='rating'
                            value={ratingValue}
                        />
                        <svg
                            width="25px" 
                            height="25px" 
                            viewBox="0 0 24 24"
                            fill={ratingValue > (review.review.rating) ? '#d4d4d4' : 'gold'}
                            xmlns="http://www.w3.org/2000/svg"
                        >                                                        
                            <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/>
                        </svg>
                    </label>
            )
        })}
        <P>{review.review.reviews}</P>
    </ReviewCard>