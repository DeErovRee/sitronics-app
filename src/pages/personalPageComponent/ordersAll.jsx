import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { nanoid } from "nanoid";

export const OrdersAll = () => {

    const { currentUser } = useContext(AuthContext)

    const [orders, setOrders] = useState([])
    const [isProvider, setIsProvider] = useState(null)

    const getOrders = async () => {
        
        if(isProvider === null) {
            return
        }

        let q
        if (isProvider) {
            // При React.strictMode в index.js функция вызывается 2 раза
            q = query(collection(db, "orders"), where("providerID", "==", currentUser.uid));
        } else {
            q = query(collection(db, "orders"), where("clientID", "==", currentUser.uid));
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setOrders(prevState => [...prevState, doc.data()])
        console.log(doc.data())
        })
    }

    useEffect(() => {
        const unsub =  onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            doc.exists() && setIsProvider(doc.data().isProvider);
        });

        return()=>{
            unsub()
        }
    }, [])

    useEffect(() => {
        getOrders()
    }, [isProvider])

    const answerOrders = async (e, orderID) => {
        console.log(orderID)
        console.log(e.target.innerText)
        if (!orderID) {
            return
        }

        let query
        if (e.target.innerText === 'Принять') {
            query = 'Принята'
        } else if (e.target.innerText === 'Отклонить') {
            query = 'Отклонена'
        }

        const orderRef = doc(db, "orders", orderID);

        await updateDoc(orderRef, {
        status: query
        });

        getOrders()
    }
    
    return(
        <div className="orders">
            <h1>Мои заявки</h1>
            {orders && orders.map((order) => {
                return(
                    <div className="order" key={nanoid()}>
                        <h3>ID заявки: {order.orderID}</h3>
                        {order.providerID === currentUser.uid ? 
                            <div className="info">
                                <div className="containerImg">
                                    <img src={order.clientPhoto} alt="" />
                                </div>
                                <p className="name">{order.clientName}</p>
                            </div> : 
                            <div className="info">
                                <div className="containerImg">
                                    <img src={order.providerPhoto} alt="" />
                                </div>
                                <p className="name">{order.providerName}</p>
                            </div>
                        }
                        <p><span>Услуга: </span>{order.service}</p>
                        <p><span>Адрес: </span>{order.address}</p>
                        <p><span>Дата: </span>{order.date}</p>
                        <p><span>Телефон: </span>{order.phone}</p>
                        <p><span>Почта: </span>{order.email}</p>
                        <p><span>Примечание: </span>{order.note}</p>
                        {order.status === 'На рассмотрении' && <p className="status"><span>Статус: </span><span className="yellow">{order.status}</span></p> }
                        {order.status === 'Принята' && <p className="status"><span>Статус: </span><span className="green">{order.status}</span></p> }
                        {order.status === 'Отклонена' && <p className="status"><span>Статус: </span><span className="red">{order.status}</span></p> }
                        {isProvider && order.status === 'На рассмотрении' &&
                            <>
                                <div className="providerTools">
                                    <div className="toolsBtn" onClick={e => answerOrders(e, order.orderID)}>Принять</div>
                                    <div className="toolsBtn" onClick={e => answerOrders(e, order.orderID)}>Отклонить</div>
                                </div>
                            </>
                        }
                        {isProvider && 
                            <>
                                <div className="toolsBtn">Связь с пользователем</div>
                            </>
                        }
                    </div>
                )
            })}
        </div>
    )
}