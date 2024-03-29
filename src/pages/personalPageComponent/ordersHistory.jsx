import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { OrdersCard } from './ordersAllComponent/ordersCard'
import { nanoid } from 'nanoid'

export const OrdersHistory = () => {
    const { currentUser } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const q = query(
            collection(db, 'orders'),
            where(currentUser.isProvider ? 'providerID' : 'clientID', '==', currentUser.uid),
        )
        const unsub = onSnapshot(q, (querySnapshot) => {
            const snapOrders = []
            querySnapshot.forEach((doc) => snapOrders.push(doc.data()))
            setOrders(
                snapOrders.filter((doc) => {
                    if (currentUser.isProvider) {
                        return doc.orderVisible.provider === false
                    } else {
                        return doc.orderVisible.client === false
                    }
                }),
            )
        })

        return () => {
            unsub()
        }
    }, [currentUser.uid, currentUser.isProvider])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>История заказов</h1>
            {orders &&
                orders.map((order) => {
                    return (
                        <OrdersCard
                            order={order}
                            isProvider={currentUser.isProvider}
                            key={nanoid()}
                            context='history'
                        />
                    )
                })}
        </>
    )
}
