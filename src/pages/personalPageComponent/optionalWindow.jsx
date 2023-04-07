import React from "react";
import { Routes, Route } from "react-router-dom";
import { OrdersAll } from './ordersAll'
import { Orders } from './orders'
import { OrdersHistory } from './ordersHistory'
import { Settings } from './settings'
import { ProviderPage } from './providerPage'



export const OptionalWindow = () => {
    
    
    return(
        <div className="optionalWindow">
            <Routes>
                <Route exact path="/ordersAll" element={<OrdersAll/>} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/ordersHistory" element={<OrdersHistory />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/providerButton" element={<ProviderPage />} />
          </Routes>
        </div>
    )
}