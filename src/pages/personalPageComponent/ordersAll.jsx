import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { nanoid } from "nanoid";

export const OrdersAll = () => {

    const { currentUser } = useContext(AuthContext)

    const [orders, setOrders] = useState([])
    const [isProvider, setIsProvider] = useState(false)

    const getOrders = async () => {
        console.log(currentUser)
        if (isProvider) {
            // При React.strictMode в index.js функция вызывается 2 раза
            const q = query(collection(db, "orders"), where("providerID", "==", currentUser.uid));
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setOrders(prevState => ([...prevState, doc.data()]))
            console.log(doc.data())
            })
        } else {
            const q = query(collection(db, "orders"), where("clientID", "==", currentUser.uid));
        
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setOrders(prevState => ([...prevState, doc.data()]))
            console.log(doc.data())
            })
        }
        
    }

    useEffect(() => {
        const unsub =  onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            doc.exists() && setIsProvider(doc.data().isProvider);
        });
      
        getOrders()

        return()=>{
            unsub()
        }
    }, [])
    return(
        <div className="orders">
            <h1>Мои заявки</h1>
            {orders && orders.map((order) => {
                return(
                    <div className="order" key={nanoid()}>
                        <h3>ID заявки: {order.orderID}</h3>
                        {isProvider === true ? 
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
                        {/* <p className="status"><span>Статус: </span>{order.status}</p> */}
                        {order.status === 'на рассмотрении' && <p><span>Статус: </span><span className="status yellow">{order.status}</span></p> }
                        {order.status === 'принята' && <p><span>Статус: </span><span className="status green">{order.status}</span></p> }
                        {order.status === 'отклонена' && <p><span>Статус: </span><span className="status red">{order.status}</span></p> }
                    </div>
                )
            })}
        </div>
    )
}