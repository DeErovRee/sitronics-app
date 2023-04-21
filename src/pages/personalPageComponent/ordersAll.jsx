import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { nanoid } from "nanoid";

export const OrdersAll = () => {

    const { currentUser } = useContext(AuthContext)

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        // При React.strictMode в index.js функция вызывается 2 раза
        const q = query(collection(db, "orders"), where("clientID", "==", currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setOrders(prevState => ([...prevState, doc.data()]))
          console.log(doc.data())
        })
    }

    useEffect(() => {
        getOrders()
    }, [])
    return(
        <div className="orders">
            <h1>Orders</h1>
            {orders && orders.map((order) => {
                return(
                    <div className="order" key={nanoid()}>
                        <p>ID заявки: </p>
                        <p>{order.providerName}</p>
                        <p>Параметры заявки:</p>
                        <p>{order.service}, {order.address}, {order.date}, {order.phone}, {order.mail}, {order.note}</p>
                        <p>Статус: {order.status}</p>
                    </div>
                )
            })}
        </div>
    )
}