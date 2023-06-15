import React from "react"; 
import styled from "styled-components";
import { DroneCard } from "./droneCard";
import bg_delivery_drone from '../../images/Background.png'
import bg_heatvision_drone from '../../images/dron_1.png'
import bg_sprinkler_drone from '../../images/dron_2.png'
import bg_firefighter_drone from '../../images/dron_3.png'
import bg_liserscan_drone from '../../images/dron_4.png'
import bg_shepherd_drone from '../../images/dron_5.png'

const DronesArr = [
    {
        title: 'Дрон-доставщик',
        background: bg_delivery_drone,
    },
    {
        title: 'Дрон с тепловизором',
        background: bg_heatvision_drone,
    },
    {
        title: 'Дрон ороситель',
        background: bg_sprinkler_drone,
    },
    {
        title: 'Дрон обнаружитель пожаров',
        background: bg_firefighter_drone,
    },
    {
        title: 'Дрон с лазерным сканером',
        background: bg_liserscan_drone,
    },
    {
        title: 'Дрон для учета животных',
        background: bg_shepherd_drone,
    },
]

const DronesStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

export const Drones = () => {
    return(
        <DronesStyled>
            {DronesArr.map(el => 
                <DroneCard 
                    title={el.title}
                    background={el.background}></DroneCard>
            )}
        </DronesStyled>
    )
}