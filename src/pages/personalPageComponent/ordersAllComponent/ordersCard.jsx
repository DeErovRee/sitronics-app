import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';

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
    margin: 5px;
`

const DisableBtn = styled(ToolsBtn)`
    background-color: gray;
`

const LikeBtn = styled(ToolsBtn)`
    background-color: rgb(52, 168, 83);
`

const DislikeBtn = styled(ToolsBtn)`
    background-color: rgb(250, 42, 42);
`

const ContainerTools = styled.div`
    width: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
    resize: none;
    margin: 10px 0 0;
    box-sizing: border-box;
`

export const OrdersCard = ({ order, isProvider, getOrders }) => {

    const { currentUser } = useContext(AuthContext)

    const [requestTime, setRequestTime] = useState(false);
    const [requestAnswer, setRequestAnswer] = useState(false);

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [text, setText] = useState('')

    const [prolong, setProlong] = useState(false)
    const [prolongTime, setProlongTime] = useState('')
    const [prolongDate, setProlongDate] = useState('')

    const [providerRating, setProviderRating] = useState(order.orderRating)

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
            getOrders()
            return
        }
        
        if (requestAnswer === true) {
            const queryStatus = 'Отклонена'
            await updateDoc(orderRef, {
                orderStatus: queryStatus,
                providerNote: text,
            });
            getOrders()
            return
        }
    }

    const hiddenOrder = async (orderID) => {

        if (!orderID) {
            return
        }
        const orderRef = doc(db, 'orders', orderID);

        await updateDoc(orderRef, {
            orderVisible: false
        });

        getOrders()
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

        getOrders()
    }

    const getProlong = async (e, orderID) => {
        const orderRef = doc(db, 'orders', orderID);

        await updateDoc(orderRef, {
            providerTime: prolongTime,
            providerDate: prolongDate
        })

        getOrders()
    }

    const setRating = async (e) => {

        if(providerRating === true) {
            return
        }

        // При React.strictMode в index.js функция вызывается 2 раза
        let rating
        
        const q = query(collection(db, "providerPages"), where("visibility", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            rating = doc.data().rating
        })

        const providerRef = doc(db, 'providerPages', order.providerID);

        if (e.target.dataset.rating === 'like') {
            await updateDoc(providerRef, {
                rating: rating+1,
            })
        }

        if (e.target.dataset.rating === 'dislike') {
            await updateDoc(providerRef, {
                rating: rating-1,
            })
        }
        
        const orderRef = doc(db, 'orders', order.orderID);

        await updateDoc(orderRef, {
            orderRating: true,
        })

        getOrders()
    }

    return(
            <>
            {order.orderVisible === true && 
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
                            <TextArea onChange={e => setText(e.target.value)} value={text}></TextArea>
                            <ProviderTools>
                                <ToolsBtn onClick={e => answerOrders(e, order.orderID)}>Подтвердить</ToolsBtn>
                                <ToolsBtn onClick={Cancle}>Отменить</ToolsBtn>
                            </ProviderTools>
                        </ContainerTools>
                    }

                    {requestAnswer && 
                        <ContainerTools>
                            <TextArea onChange={e => setText(e.target.value)} value={text}></TextArea>
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

                    {(order.orderStatus === 'Выполнена' || order.orderStatus === 'Отклонена') &&
                        <>
                            <ProviderTools>
                                <ToolsBtn onClick={e => hiddenOrder(order.orderID)}>Скрыть</ToolsBtn>
                            </ProviderTools>
                        </>
                    }

                    {!isProvider && (order.orderStatus === 'Выполнена' || order.orderStatus === 'Отклонена') && !providerRating ?
                        <ContainerTools>
                            <LikeBtn data-rating='like' onClick={(e)=>setRating(e)}>
                                <svg width="35px" height="35px" data-rating='like' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </LikeBtn>
                            <DislikeBtn data-rating='dislike' onClick={(e)=>setRating(e)}>
                                <svg width="35px" height="35px" data-rating='dislike' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </DislikeBtn>
                        </ContainerTools>
                        :
                        <ContainerTools>
                            <DisableBtn>
                                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </DisableBtn>
                            <DisableBtn>
                                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </DisableBtn>
                        </ContainerTools>
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

                </OrderCard>}
            </>
    )
}