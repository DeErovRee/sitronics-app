import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

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

    const answerOrders = async (e, orderID) => {

        if (!orderID) {
            return
        }

        const orderRef = doc(db, "orders", orderID);

        if (requestTime === true) {
            const queryStatus = 'Принята'
            await updateDoc(orderRef, {
                orderStatus: queryStatus,
                providerNote: text,
                providerDate: date,
                providerTime: time,
            });
        }

        if (requestAnswer === true) {
            const queryStatus = 'Отклонена'
            await updateDoc(orderRef, {
                orderStatus: queryStatus,
                providerNote: text,
            });
        }

        getOrders()
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
                    <P><Span>Примечание: </Span>{order.clientNote}</P>

                    {order.orderStatus === 'На рассмотрении' && <Status><Span>Статус: </Span><YellowStatus>{order.orderStatus}</YellowStatus></Status> }
                    {order.orderStatus === 'Принята' && <Status><Span>Статус: </Span><GreenStatus>{order.orderStatus}</GreenStatus></Status> }
                    {order.orderStatus === 'Отклонена' && <Status><Span>Статус: </Span><RedStatus>{order.orderStatus}</RedStatus></Status> }
                    
                    {order.providerNote && <P><Span>Комментарий поставщика: </Span>{order.providerNote}</P>}
                    {order.providerDate && <P><Span>Ориентировочная дата выполнения заказа:<br/> </Span>{order.providerDate}</P>}
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

                    {isProvider && order.orderStatus === 'Принята' && 
                        <>
                            <ProviderTools>
                                <ToolsBtn onClick={e => hiddenOrder(order.orderID)}>Скрыть</ToolsBtn>
                            </ProviderTools>
                        </>
                    }
                    
                    {isProvider && 
                        <>
                            <ToolsBtn>Связь с пользователем</ToolsBtn>
                        </>
                    }
                </OrderCard>}
            </>
    )
}