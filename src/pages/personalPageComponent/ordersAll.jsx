import { collection, onSnapshot, query, where } from "firebase/firestore";
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

    useEffect(() => {
        const q = query(collection(db, "orders"), where(currentUser.isProvider ? 'providerID' : 'clientID', "==", currentUser.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const snapOrders = []
            querySnapshot.forEach((doc) => 
                snapOrders.push(doc.data())
            );
            console.log(snapOrders)
            setOrders(snapOrders.filter((doc) => {
                if(currentUser.isProvider) {
                    return doc.orderVisible.provider === true
                } else {
                    return doc.orderVisible.client === true
                }
            }))
        });

        return(() => {
            unsub()
        })
    }, [currentUser.uid, currentUser.isProvider])
    
    return(
        <>
            <h1 style={{textAlign: 'center'}}>Мои заказы</h1>
                {orders && orders.map((order) => {
                    return(<OrdersCard 
                        order={order} 
                        isProvider={currentUser.isProvider}
                        key={nanoid()}
                        context='actual'/>)
            })}
        </>
    )
}