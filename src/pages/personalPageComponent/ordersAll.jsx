import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { nanoid } from "nanoid";
import { OrdersCard } from "./ordersAllComponent/ordersCard";


export const OrdersAll = () => {

    const { currentUser } = useContext(AuthContext)

    const [orders, setOrders] = useState([]);
    const [isProvider, setIsProvider] = useState(null);

    useEffect(() => {
        const unsub =  onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            doc.exists() && setIsProvider(doc.data().isProvider);
        });

        return()=>{
            unsub()
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const q = query(collection(db, "orders"), where("orderVisible", "==", true));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const snapOrders = []
            querySnapshot.forEach((doc) => {
                snapOrders.push(doc.data())
            });
            setOrders(snapOrders)
        });

        return(() => {
            unsub()
        })
    }, [])
    
    return(
        <div className="orders">
            <h1>Мои заказы</h1>
            {orders && orders.map((order) => {
                return(
                    <OrdersCard 
                        order={order}
                        isProvider={isProvider}
                        key={nanoid()}/>
                )
            })}
        </div>
    )
}