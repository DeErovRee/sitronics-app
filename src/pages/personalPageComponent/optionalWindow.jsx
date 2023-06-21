import React from "react";
import { Routes, Route } from "react-router-dom";
import { OrdersAll } from './ordersAll'
import { OrdersHistory } from './ordersHistory'
import { Settings } from './settings'
import { ProviderPage } from './providerPage'
import styled from "styled-components";

const WindowStyled = styled.div`
    padding: 0px 12px;
`

export const OptionalWindow = () => {
    
    return(
        <WindowStyled>
            <Routes>
                <Route exact path="/" element={<h1>Выберите справа</h1>} />
                <Route exact path="/ordersAll" element={<OrdersAll/>} />
                <Route exact path="/ordersHistory" element={<OrdersHistory />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/providerButton" element={<ProviderPage />} />
          </Routes>
        </WindowStyled>
    )
}