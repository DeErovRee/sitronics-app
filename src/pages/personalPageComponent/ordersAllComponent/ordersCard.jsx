import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { Timestamp, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`
    
    return today
}

const OrderCard = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    border-radius: 20px;
    padding: 20px 29px;
    margin-bottom: 10px;
    box-sizing: border-box;
`

const H3 = styled.h3`
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 400;
`

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 8px;
`

const ContainerImg = styled.div`
    position: relative;
    margin: 0;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 7px 0 0;
`

const Name = styled.p`
    font-size: 24px;
    font-weight: 500;
    margin: 0;
`

const Span = styled.span`
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    color: #000000;
`

const P = styled.p`
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    margin: 0;
`

const Status = styled.p`
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    margin: 0;
    margin: 10px 0 15px;
`

const YellowStatus = styled.span`
    background-color: #FBBC05;
    margin: 3px;
    padding: 5px 13px 7px;
    border-radius: 5px;
`

const RedStatus = styled.span`
    background-color: #FF0000;
    margin: 3px;
    padding: 5px 13px 7px;
    border-radius: 5px;
`

const GreenStatus = styled.span`
    background-color: #34A853;
    margin: 3px;
    padding: 5px 13px 7px;
    border-radius: 5px;
`

const ProviderTools = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ToolsBtn = styled.button`
    margin: 10px 0 0;
    background-color: rgb(141, 164, 241);
    border-radius: 5px;
    padding: 5px 9px;
    font-weight: 300;
    border: none;
    cursor: pointer;
    margin: 5px 5px 5px 0;
`

const ContainerTools = styled.div`
    width: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
    resize: none;
    margin: 10px 0 0;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
`

const Input = styled.input`
    display: none;
`

const StarContainer = styled.div`
    display: flex;
`

const Star = styled.svg`

`

export const OrdersCard = ({ order, isProvider, context}) => {

    const { currentUser } = useContext(AuthContext)

    const [requestTime, setRequestTime] = useState(false);
    const [requestAnswer, setRequestAnswer] = useState(false);

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [text, setText] = useState('')

    const [prolong, setProlong] = useState(false)
    const [prolongTime, setProlongTime] = useState('')
    const [prolongDate, setProlongDate] = useState('')

    const [rating, setRating] = useState(order.orderRatingValue)
    const [hover, setHover] = useState(null)

    const [orderReviews, setOrderReviews] = useState(order.orderReviews)
    const [orderReviewsText] = useState(order.orderReviewsText)
    const [reviews, setReviews] = useState('')

    const answerOrders = async (e, orderID) => {
        if (!orderID) {
            return
        }

        const orderRef = doc(db, "orders", orderID);

        if (requestTime === true) {
            const queryStatus = 'В работе'
            await updateDoc(orderRef, {
                orderStatus: queryStatus,
                providerNote: text,
                providerDate: date,
                providerTime: time,
                confirmationTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                confirmationDate: getDate()
            });
            return
        }
        
        if (requestAnswer === true) {
            const queryStatus = 'Отклонена'
            await updateDoc(orderRef, {
                orderStatus: queryStatus,
                providerNote: text,
            });
            return
        }
    }

    const hiddenOrder = async (isProvider, orderID) => {

        if (!orderID) {
            return
        }

        const orderRef = doc(db, 'orders', orderID);
        if (isProvider) {
            await updateDoc(orderRef, {
                'visible.provider': false
            });
        } else {
            await updateDoc(orderRef, {
                'visible.client': false
            });
        }
    }

    const Cancle = () => {
        setRequestAnswer(false)
        setRequestTime(false)
    }

    const ChangeStatus = async (e, orderID, status) => {

        if(!orderID) {
            return
        }
        const orderRef = doc(db, 'orders', orderID);

        await updateDoc(orderRef, {
            orderStatus: status
        })
    }

    const getProlong = async (e, orderID) => {
        const orderRef = doc(db, 'orders', orderID);

        await updateDoc(orderRef, {
            providerTime: prolongTime,
            providerDate: prolongDate
        })
    }

    const shareReviews = async (rating, order) => {

        setRating(rating)

        let ratingCount
        let ratingValue
        
        const q = query(collection(db, "providerPages"), where("visibility", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ratingCount = doc.data().ratingCount
            ratingValue = doc.data().ratingValue
        })

        const providerRef = doc(db, 'providerPages', order.providerID);

        const finalRating = (ratingValue + rating)/(2)

        await updateDoc(providerRef, {
            ratingValue: finalRating,
            ratingCount: Number(ratingCount+1)
        })
        
        const reviewsRef = doc(db, 'userReviews', order.providerID);

        await updateDoc(reviewsRef, {
            reviews: arrayUnion({
                userName: order.clientName,
                service: order.orderService,
                orderId: order.orderID,
                reviews,
                clientId: order.clientID,
                date: Timestamp.now(),
                rating,
                // file: downloadURL, //Может позже
            }),
        })

        const orderRef = doc(db, 'orders', order.orderID);

        await updateDoc(orderRef, {
            orderReviews: true,
            orderReviewsText: reviews,
            orderRatingValue: rating,
        })

        setOrderReviews(true)
    }

    return(
            <>
                <OrderCard>
                    <H3>ID заявки: {order.orderID}</H3>
                    {order.providerID === currentUser.uid ? 
                        <Info>
                            <ContainerImg>
                                <Img src={order.clientPhoto} alt="" />
                            </ContainerImg>
                            <Name>{order.clientName}</Name>
                        </Info> : 
                        <Info>
                            <ContainerImg>
                                <Img src={order.providerPhoto} alt="" />
                            </ContainerImg>
                            <Name>{order.providerName}</Name>
                        </Info>
                    }
                    <P><Span>Услуга: </Span>{order.orderService}</P>
                    <P><Span>Адрес: </Span>{order.clientAddress}</P>
                    <P><Span>Дата: </Span>{order.clientDate}</P>
                    <P><Span>Телефон: </Span>{order.clientPhone}</P>
                    <P><Span>Почта: </Span>{order.clientEmail}</P>
                    <P><Span>Комментарий клиента: </Span>{order.clientNote}</P>
                    
                    {order.providerNote && <P><Span>Комментарий поставщика: </Span>{order.providerNote}</P>}
                    {order.confirmationDate && <P><Span>Дата принятия заказа: </Span><br/>{order.confirmationDate} {order.confirmationTime}</P>}
                    {order.providerDate && <P><Span>Ориентировочная дата выполнения заказа:<br/> </Span>{order.providerDate} {order.providerTime}</P>}

                    {order.orderStatus === 'На рассмотрении' && <Status><Span>Статус: </Span><YellowStatus>{order.orderStatus}</YellowStatus></Status> }
                    {order.orderStatus === 'В работе' && <Status><Span>Статус: </Span><GreenStatus>{order.orderStatus}</GreenStatus></Status> }
                    {order.orderStatus === 'Отклонена' && <Status><Span>Статус: </Span><RedStatus>{order.orderStatus}</RedStatus></Status> }
                    {order.orderStatus === 'Выполнена' && <Status><Span>Статус: </Span><GreenStatus>{order.orderStatus}</GreenStatus></Status>}
                    {order.orderStatus === 'Отменена' && <Status><Span>Статус: </Span><RedStatus>{order.orderStatus}</RedStatus></Status>}
                    
                    {isProvider && order.orderStatus === 'На рассмотрении' && (!requestTime && !requestAnswer) &&
                        <ProviderTools>
                            <ToolsBtn onClick={e => setRequestTime(true)}>Принять</ToolsBtn>
                            <ToolsBtn onClick={e => setRequestAnswer(true)}>Отклонить</ToolsBtn>
                        </ProviderTools>
                    }

                    {requestTime && 
                        <ContainerTools>
                            <ProviderTools>
                                <input type="date" onChange={e => setDate(e.target.value)} value={date}/>
                                <input type="time" onChange={e => setTime(e.target.value)} value={time}/>
                            </ProviderTools>
                            <TextArea onChange={e => setText(e.target.value)} value={text} placeholder='Примечание'></TextArea>
                            <ProviderTools>
                                <ToolsBtn onClick={e => answerOrders(e, order.orderID)}>Подтвердить</ToolsBtn>
                                <ToolsBtn onClick={Cancle}>Отменить</ToolsBtn>
                            </ProviderTools>
                        </ContainerTools>
                    }

                    {requestAnswer && 
                        <ContainerTools>
                            <TextArea onChange={e => setText(e.target.value)} value={text} placeholder='Укажите причину отказа'></TextArea>
                            <ProviderTools>
                                <ToolsBtn onClick={e => answerOrders(e, order.orderID)}>Подтвердить</ToolsBtn>
                                <ToolsBtn onClick={Cancle}>Отменить</ToolsBtn>
                            </ProviderTools>
                        </ContainerTools>
                    }

                    {isProvider && order.orderStatus === 'В работе' && !prolong && !requestAnswer &&
                        <ProviderTools>
                            <ToolsBtn onClick={e => ChangeStatus(e, order.orderID, 'Выполнена')}>Выполнена</ToolsBtn>
                            <ToolsBtn onClick={() => setProlong(true)}>Продлить</ToolsBtn>
                            <ToolsBtn onClick={() => setRequestAnswer(true)}>Отклонить</ToolsBtn>
                        </ProviderTools>
                    }

                    {isProvider && prolong === true && 
                        <ContainerTools>
                            <ProviderTools>
                                <input type="date" onChange={e => setProlongDate(e.target.value)} value={prolongDate}/>
                                <input type="time" onChange={e => setProlongTime(e.target.value)} value={prolongTime}/>
                            </ProviderTools>
                            <ProviderTools>
                                <ToolsBtn onClick={e => getProlong(e, order.orderID)}>Подтвердить</ToolsBtn>
                                <ToolsBtn onClick={e => setProlong(false)}>Отменить</ToolsBtn>
                            </ProviderTools>
                            
                        </ContainerTools>
                    }

                    {!isProvider && (order.orderStatus === 'Выполнена' || order.orderStatus === 'Отклонена') && !orderReviews &&
                        <>
                            <StarContainer>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1
                                    return(
                                            <label key={nanoid()}>
                                                <Input 
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                    onClick={() => setRating(ratingValue)}
                                                />
                                                <Star 
                                                    width="35px" 
                                                    height="35px" 
                                                    viewBox="0 0 24 24"
                                                    // stroke={ratingValue > (hover || rating) ? 'grey' : 'black'} 
                                                    fill={ratingValue > (hover || rating) ? '#d4d4d4' : 'gold'}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                >
                                                    {/* <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> */}
                                                    <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/>
                                                </Star>
                                            </label>
                                    )
                                })}
                            </StarContainer>
                            <TextArea value={reviews} onChange={(e) => setReviews(e.target.value)} name='reviews' />
                            <ToolsBtn onClick={()=>{shareReviews(rating, order)}}>Отправить</ToolsBtn>
                        </>
                    }

                    {orderReviews && 
                        <>
                            <StarContainer>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1
                                    return(
                                            <label key={nanoid()}>
                                                <Input 
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                />
                                                <Star 
                                                    width="35px" 
                                                    height="35px" 
                                                    viewBox="0 0 24 24" 
                                                    // stroke={ratingValue > (hover || rating) ? 'grey' : 'black'} 
                                                    fill={ratingValue > (hover || rating) ? '#d4d4d4' : 'gold'}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >                                                    
                                                    <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/>
                                                </Star>
                                            </label>
                                    )
                                })}
                            </StarContainer>
                            <P><Span>Отзыв: </Span>{orderReviewsText}</P>
                        </>
                    }
                    
                    {isProvider && 
                        <>
                            <Link to="/chats" state={{
                                client: {
                                    displayName: order.clientName,
                                    photoURL: order.clientPhoto,
                                    uid: order.clientID
                                    }
                            }}>
                                <ToolsBtn>Связь с пользователем</ToolsBtn>
                            </Link>
                        </>
                    }

                    {(order.orderStatus === 'Выполнена' || order.orderStatus === 'Отклонена') && context === 'actual' &&
                        <>
                            <ProviderTools>
                                <ToolsBtn onClick={e => hiddenOrder(isProvider, order.orderID)}>Скрыть</ToolsBtn>
                            </ProviderTools>
                        </>
                    }
                </OrderCard>
            </>
    )
}