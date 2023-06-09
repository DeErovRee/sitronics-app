import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { OrdersCard } from "./ordersAllComponent/ordersCard";
import { nanoid } from "nanoid";

export const OrdersHistory = () => {

    const { currentUser } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const q = query(collection(db, "orders"), where(currentUser.isProvider ? 'providerID' : 'clientID', "==", currentUser.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const snapOrders = []
            querySnapshot.forEach((doc) => 
                snapOrders.push(doc.data())
            );
            setOrders(snapOrders.filter((doc) => {
                if(currentUser.isProvider) {
                    return doc.visible.provider === false
                } else {
                    return doc.visible.client === false
                }
            }))
        });

        return(() => {
            unsub()
        })
    }, [currentUser.uid, currentUser.isProvider])

    

    return(
        <>
            <h1>История заказов</h1>
            <div>
                {orders && orders.map((order) => {
                    return(<OrdersCard 
                        order={order} 
                        isProvider={currentUser.isProvider}
                        key={nanoid()}
                        context='history'/>)
            })}
            </div>
        </>
    )
}