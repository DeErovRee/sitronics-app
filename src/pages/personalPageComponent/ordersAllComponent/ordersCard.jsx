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

const ContainerTools = styled.div`
    width: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
    resize: none;
    margin: 10px 0 0;
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

    const [rating, setRating] = useState(order.orderRatingValue)
    const [hover, setHover] = useState(null)

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

    const shareRating = async (rating, getOrders) => {

        setRating(rating)

        if(providerRating === true) {
            return
        }

        // // При React.strictMode в index.js функция вызывается 2 раза
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
            ratingCount: ratingCount+1
        })
        
        const orderRef = doc(db, 'orders', order.orderID);

        await updateDoc(orderRef, {
            orderRating: true,
            orderRatingValue: rating,
        })

        setProviderRating(true)

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

                    {!isProvider && (order.orderStatus === 'Выполнена' || order.orderStatus === 'Отклонена') && !providerRating &&
                        <StarContainer>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1
                                return(
                                    <label>
                                        <Input 
                                            type='radio'
                                            name='rating'
                                            value={ratingValue}
                                            onClick={() => shareRating(ratingValue)}
                                        />
                                        <Star 
                                            width="35px" 
                                            height="35px" 
                                            viewBox="0 0 24 24"
                                            stroke={ratingValue > (hover || rating) ? 'grey' : 'black'} 
                                            fill={ratingValue > (hover || rating) ? '#d4d4d4' : 'gold'} 
                                            xmlns="http://www.w3.org/2000/svg"
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        >
                                            <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            
                                            {/* <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/> */}

                                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M50,38a11.735,11.735,0,0,0-5.153,1.191L42.606,36.95a7.009,7.009,0,0,1,0-9.9l2.237-2.236A11.822,11.822,0,0,0,50,26a12.075,12.075,0,1,0-10.81-6.847l-2.24,2.241a7.009,7.009,0,0,1-9.9,0l-2.235-2.236a12.054,12.054,0,1,0-5.657,5.657l2.236,2.235a7.009,7.009,0,0,1,0,9.9l-2.241,2.24A11.983,11.983,0,1,0,26,50a11.822,11.822,0,0,0-1.186-5.157l2.236-2.237a7.009,7.009,0,0,1,9.9,0l2.241,2.241A11.735,11.735,0,0,0,38,50,12,12,0,1,0,50,38ZM40,14A10,10,0,1,1,50,24a9.9,9.9,0,0,1-3.654-.689l3.332-3.332a4,4,0,0,0-5.657-5.657L40.7,17.648A10.015,10.015,0,0,1,40,14ZM14,24a10.005,10.005,0,1,1,9.308-6.349l-3.329-3.329a4,4,0,0,0-5.657,5.657l3.329,3.329A10.094,10.094,0,0,1,14,24ZM24,50a10.018,10.018,0,1,1-6.352-9.3l-3.326,3.326a4,4,0,0,0,5.657,5.657l3.332-3.332A9.9,9.9,0,0,1,24,50Zm1.636-8.808-7.071,7.072a2,2,0,1,1-2.829-2.829l7.072-7.071a9.01,9.01,0,0,0,0-12.728l-7.072-7.071a2,2,0,0,1,2.829-2.829l7.071,7.072a9.012,9.012,0,0,0,12.728,0l7.071-7.072a2,2,0,1,1,2.829,2.829l-7.072,7.071a9.01,9.01,0,0,0,0,12.728l7.072,7.071a2,2,0,1,1-2.829,2.829l-7.071-7.072A9.012,9.012,0,0,0,25.636,41.192ZM50,60A10.011,10.011,0,0,1,40,50a9.819,9.819,0,0,1,.692-3.651l3.329,3.329a4,4,0,0,0,5.657-5.657l-3.329-3.329A9.815,9.815,0,0,1,50,40a10,10,0,0,1,0,20Z"/><path d="M49,12a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5.006,5.006,0,0,0-5-5,1,1,0,0,0,0,2Z"/><path d="M49,8a7.008,7.008,0,0,1,7,7,1,1,0,0,0,2,0,9.011,9.011,0,0,0-9-9,1,1,0,0,0,0,2Z"/><path d="M16,11a1,1,0,0,0-1-1,5.006,5.006,0,0,0-5,5,1,1,0,0,0,2,0,3,3,0,0,1,3-3A1,1,0,0,0,16,11Z"/><path d="M15,8a1,1,0,0,0,0-2,9.011,9.011,0,0,0-9,9,1,1,0,0,0,2,0A7.008,7.008,0,0,1,15,8Z"/><path d="M49,54a5.006,5.006,0,0,0,5-5,1,1,0,0,0-2,0,3,3,0,0,1-3,3,1,1,0,0,0,0,2Z"/><path d="M56,49a7.008,7.008,0,0,1-7,7,1,1,0,0,0,0,2,9.011,9.011,0,0,0,9-9,1,1,0,0,0-2,0Z"/><path d="M15,52a3,3,0,0,1-3-3,1,1,0,0,0-2,0,5.006,5.006,0,0,0,5,5,1,1,0,0,0,0-2Z"/><path d="M15,56a7.008,7.008,0,0,1-7-7,1,1,0,0,0-2,0,9.011,9.011,0,0,0,9,9,1,1,0,0,0,0-2Z"/><path d="M32,29a3,3,0,1,0,3,3A3,3,0,0,0,32,29Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,32,33Z"/></g></svg> */}
                                            
                                            {/* <path d="M6.504 21h-.006a1.5 1.5 0 0 1-1.177-2.428l.372-.472c.103-.023.201-.053.31-.067A3.847 3.847 0 0 1 6.504 18a3.756 3.756 0 0 1 .51.036l-.908 1.154a.5.5 0 0 0 .083.703.441.441 0 0 0 .703-.083l1.146-1.46a2.042 2.042 0 0 1 .775.634L7.68 20.427a1.492 1.492 0 0 1-1.176.572zM3.252 6.667a1.501 1.501 0 0 0 .416 2.08l.327.218a3.763 3.763 0 0 0 .5.034 3.847 3.847 0 0 0 .503-.033 3.586 3.586 0 0 0 .6-.134l-1.375-.917a.5.5 0 1 1 .554-.832l1.8 1.2a1.674 1.674 0 0 0 .242-.259.851.851 0 0 0 .16-.676L5.33 6.251a1.504 1.504 0 0 0-.842-.25 1.492 1.492 0 0 0-1.237.667zm17.496 11.664a1.501 1.501 0 0 0-.416-2.08l-.327-.218a3.763 3.763 0 0 0-.5-.034 3.847 3.847 0 0 0-.503.033 3.586 3.586 0 0 0-.6.134l1.375.917a.5.5 0 0 1 .139.693.511.511 0 0 1-.693.139l-1.8-1.2a1.67 1.67 0 0 0-.242.259.851.851 0 0 0-.16.676l1.648 1.098a1.538 1.538 0 0 0 2.079-.417zM16.32 4.573l-1.134 1.443a2.042 2.042 0 0 0 .775.633l1.146-1.459a.495.495 0 0 1 .333-.187.484.484 0 0 1 .37.104.5.5 0 0 1 .083.703l-.908 1.154a3.756 3.756 0 0 0 .51.036 3.847 3.847 0 0 0 .503-.033c.108-.014.206-.044.31-.067l.37-.472a1.497 1.497 0 0 0-1.037-2.42c-.021 0-.041-.003-.062-.003a1.514 1.514 0 0 0-.207.004c-.022 0-.045.003-.067.004a1.49 1.49 0 0 0-.985.56zm7.605 12.292a2.853 2.853 0 0 1-.46 2.296 4.563 4.563 0 0 1-3.205 1.79 5.748 5.748 0 0 1-.751.048c-2.133 0-4.04-1.187-4.434-2.864a2.785 2.785 0 0 1 .14-1.69l-1.475-.982a1.85 1.85 0 0 0-2.47.394l-1.206 1.535a3.14 3.14 0 0 1 .86 1.473 2.853 2.853 0 0 1-.46 2.296 4.563 4.563 0 0 1-3.204 1.79 5.748 5.748 0 0 1-.751.048c-2.133 0-4.04-1.187-4.434-2.864a2.853 2.853 0 0 1 .46-2.296 4.563 4.563 0 0 1 3.205-1.79 5.673 5.673 0 0 1 1.549.02l1.299-1.654a1.844 1.844 0 0 0-.426-2.67l-1.677-1.12a5.42 5.42 0 0 1-1.225.325 5.748 5.748 0 0 1-.751.049c-2.133 0-4.04-1.187-4.434-2.864a2.853 2.853 0 0 1 .46-2.296 4.563 4.563 0 0 1 3.205-1.79c2.418-.319 4.745.944 5.185 2.816a2.784 2.784 0 0 1-.14 1.69l1.475.982a1.85 1.85 0 0 0 2.47-.394l1.203-1.532a3.14 3.14 0 0 1-.858-1.476 2.853 2.853 0 0 1 .46-2.296 4.563 4.563 0 0 1 3.205-1.79c2.415-.32 4.745.944 5.185 2.816a2.853 2.853 0 0 1-.46 2.296 4.563 4.563 0 0 1-3.205 1.79 5.748 5.748 0 0 1-.751.048 5.704 5.704 0 0 1-.805-.058l-1.292 1.644a1.844 1.844 0 0 0 .426 2.67l1.677 1.12a5.42 5.42 0 0 1 1.225-.325c2.416-.322 4.745.943 5.185 2.815zm-1.283 1.728a1.845 1.845 0 0 0 .31-1.5c-.29-1.23-1.765-2.094-3.44-2.094a4.76 4.76 0 0 0-.64.043 3.617 3.617 0 0 0-2.514 1.365 1.845 1.845 0 0 0-.31 1.5c.327 1.385 2.155 2.314 4.08 2.051a3.617 3.617 0 0 0 2.514-1.365zM14.048 5.906c.327 1.386 2.151 2.315 4.08 2.052a3.617 3.617 0 0 0 2.514-1.365 1.845 1.845 0 0 0 .31-1.5C20.662 3.864 19.187 3 17.512 3a4.76 4.76 0 0 0-.64.043 3.617 3.617 0 0 0-2.514 1.365 1.845 1.845 0 0 0-.31 1.5zm-8.92 4.052a3.617 3.617 0 0 0 2.514-1.365 1.845 1.845 0 0 0 .31-1.5C7.662 5.864 6.187 5 4.512 5a4.76 4.76 0 0 0-.64.043 3.617 3.617 0 0 0-2.514 1.365 1.845 1.845 0 0 0-.31 1.5c.327 1.385 2.152 2.313 4.08 2.051zm4.824 9.136c-.29-1.23-1.765-2.095-3.44-2.095a4.76 4.76 0 0 0-.64.043 3.617 3.617 0 0 0-2.514 1.365 1.845 1.845 0 0 0-.31 1.5c.327 1.385 2.151 2.313 4.08 2.051a3.617 3.617 0 0 0 2.514-1.365 1.845 1.845 0 0 0 .31-1.5zm4.343-4.463l1.453.969a3.865 3.865 0 0 1 .763-.694l-1.227-.818a2.842 2.842 0 0 1-.659-4.12l1.02-1.299a4.96 4.96 0 0 1-.93-.433L13.516 9.76a2.857 2.857 0 0 1-3.812.61L8.252 9.4a3.866 3.866 0 0 1-.763.694l1.227.818a2.842 2.842 0 0 1 .659 4.12l-1.013 1.29a4.884 4.884 0 0 1 .918.45l1.203-1.532a2.854 2.854 0 0 1 3.812-.61z"/><path fill="none" d="M0 0h24v24H0z"/> */}
                                        
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M38.364,41.192l7.071,7.072a2,2,0,1,0,2.829-2.829l-7.072-7.071a9.01,9.01,0,0,1,0-12.728l7.072-7.071a2,2,0,1,0-2.829-2.829l-7.071,7.072a9.012,9.012,0,0,1-12.728,0l-7.071-7.072a2,2,0,0,0-2.829,2.829l7.072,7.071a9.01,9.01,0,0,1,0,12.728l-7.072,7.071a2,2,0,1,0,2.829,2.829l7.071-7.072A9.012,9.012,0,0,1,38.364,41.192ZM29,32a3,3,0,1,1,3,3A3,3,0,0,1,29,32Z"/><circle cx="32" cy="32" r="1"/><path d="M14,24a10.094,10.094,0,0,0,3.651-.692l-3.329-3.329a4,4,0,0,1,5.657-5.657l3.329,3.329A10,10,0,1,0,14,24Zm1-12a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5,1,1,0,0,1,0,2Zm0-6a1,1,0,0,1,0,2,7.008,7.008,0,0,0-7,7,1,1,0,0,1-2,0A9.011,9.011,0,0,1,15,6Z"/><path d="M23.311,46.346l-3.332,3.332a4,4,0,0,1-5.657-5.657L17.648,40.7A10,10,0,1,0,24,50,9.9,9.9,0,0,0,23.311,46.346ZM15,58a9.011,9.011,0,0,1-9-9,1,1,0,0,1,2,0,7.008,7.008,0,0,0,7,7,1,1,0,0,1,0,2Zm0-4a5.006,5.006,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3,1,1,0,0,1,0,2Z"/><path d="M40.7,17.648l3.326-3.326a4,4,0,0,1,5.657,5.657l-3.332,3.332A9.9,9.9,0,0,0,50,24a10.018,10.018,0,1,0-9.3-6.352ZM49,6a9.011,9.011,0,0,1,9,9,1,1,0,0,1-2,0,7.008,7.008,0,0,0-7-7,1,1,0,0,1,0-2Zm0,4a5.006,5.006,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3,1,1,0,0,1,0-2Z"/><path d="M50,40a9.815,9.815,0,0,0-3.651.692l3.329,3.329a4,4,0,0,1-5.657,5.657l-3.329-3.329A9.819,9.819,0,0,0,40,50,10,10,0,1,0,50,40ZM49,52a3,3,0,0,0,3-3,1,1,0,0,1,2,0,5.006,5.006,0,0,1-5,5,1,1,0,0,1,0-2Zm0,6a1,1,0,0,1,0-2,7.008,7.008,0,0,0,7-7,1,1,0,0,1,2,0A9.011,9.011,0,0,1,49,58Z"/></g></svg> */}

                                        </Star>
                                    </label>
                                    
                                )
                            })}
                        </StarContainer>
                    }

                    {!isProvider && providerRating && 
                        <StarContainer>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1
                                return(
                                    <label>
                                        <Input 
                                            type='radio'
                                            name='rating'
                                            value={ratingValue}
                                        />
                                        <Star 
                                            width="35px" 
                                            height="35px" 
                                            viewBox="0 0 24 24" 
                                            stroke={ratingValue > (hover || rating) ? 'grey' : 'black'} 
                                            fill={ratingValue > (hover || rating) ? '#d4d4d4' : 'gold'}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            
                                            {/* <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/> */}
	
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M38.364,41.192l7.071,7.072a2,2,0,1,0,2.829-2.829l-7.072-7.071a9.01,9.01,0,0,1,0-12.728l7.072-7.071a2,2,0,1,0-2.829-2.829l-7.071,7.072a9.012,9.012,0,0,1-12.728,0l-7.071-7.072a2,2,0,0,0-2.829,2.829l7.072,7.071a9.01,9.01,0,0,1,0,12.728l-7.072,7.071a2,2,0,1,0,2.829,2.829l7.071-7.072A9.012,9.012,0,0,1,38.364,41.192ZM29,32a3,3,0,1,1,3,3A3,3,0,0,1,29,32Z"/><circle cx="32" cy="32" r="1"/><path d="M14,24a10.094,10.094,0,0,0,3.651-.692l-3.329-3.329a4,4,0,0,1,5.657-5.657l3.329,3.329A10,10,0,1,0,14,24Zm1-12a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5,1,1,0,0,1,0,2Zm0-6a1,1,0,0,1,0,2,7.008,7.008,0,0,0-7,7,1,1,0,0,1-2,0A9.011,9.011,0,0,1,15,6Z"/><path d="M23.311,46.346l-3.332,3.332a4,4,0,0,1-5.657-5.657L17.648,40.7A10,10,0,1,0,24,50,9.9,9.9,0,0,0,23.311,46.346ZM15,58a9.011,9.011,0,0,1-9-9,1,1,0,0,1,2,0,7.008,7.008,0,0,0,7,7,1,1,0,0,1,0,2Zm0-4a5.006,5.006,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3,1,1,0,0,1,0,2Z"/><path d="M40.7,17.648l3.326-3.326a4,4,0,0,1,5.657,5.657l-3.332,3.332A9.9,9.9,0,0,0,50,24a10.018,10.018,0,1,0-9.3-6.352ZM49,6a9.011,9.011,0,0,1,9,9,1,1,0,0,1-2,0,7.008,7.008,0,0,0-7-7,1,1,0,0,1,0-2Zm0,4a5.006,5.006,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3,1,1,0,0,1,0-2Z"/><path d="M50,40a9.815,9.815,0,0,0-3.651.692l3.329,3.329a4,4,0,0,1-5.657,5.657l-3.329-3.329A9.819,9.819,0,0,0,40,50,10,10,0,1,0,50,40ZM49,52a3,3,0,0,0,3-3,1,1,0,0,1,2,0,5.006,5.006,0,0,1-5,5,1,1,0,0,1,0-2Zm0,6a1,1,0,0,1,0-2,7.008,7.008,0,0,0,7-7,1,1,0,0,1,2,0A9.011,9.011,0,0,1,49,58Z"/></g></svg> */}
                                        </Star>
                                    </label>
                                    
                                )
                            })}
                        </StarContainer>
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