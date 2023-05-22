import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
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
    const [requestTime, setRequestTime] = useState(true);
    const [requestAnswer, setRequestAnswer] = useState(false);

    const getOrders = async () => {
        
        setOrders([])
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
    
    return(
        <div className="orders">
            <h1>Мои заявки</h1>
            {orders && orders.map((order) => {
                return(
                    <OrdersCard 
                        order={order}
                        isProvider={isProvider}
                        key={nanoid()}
                        getOrders={getOrders}/>
                )
            })}
        </div>
    )
}