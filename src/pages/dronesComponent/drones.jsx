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
        url: 'delivery_drone',
        title: 'Дрон-доставщик',
        background: bg_delivery_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
    {
        url: 'heatvision_drone',
        title: 'Дрон с тепловизором',
        background: bg_heatvision_drone,
        description: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: ['Экономия посевных площадей', 'Экономия на химикатах до 18%', 'Выполнение работ на любой почве', 'Работа в ночное время']
    },
    {
        url: 'sprinkler_drone',
        title: 'Дрон ороситель',
        background: bg_sprinkler_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
    {
        url: 'firefighter_drone',
        title: 'Дрон обнаружитель пожаров',
        background: bg_firefighter_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
    {
        url: 'liserscan_drone',
        title: 'Дрон с лазерным сканером',
        background: bg_liserscan_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
    {
        url: 'shepherd_drone',
        title: 'Дрон для учета животных',
        background: bg_shepherd_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
]

const DronesStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

export const Drones = () => {

    localStorage.setItem('DronesPage', JSON.stringify(DronesArr))

    return(
        <DronesStyled>
            {DronesArr.map(el => 
                <DroneCard 
                    title={el.title}
                    background={el.background}
                    url={el.url}
                    description={el.description}
                    advantages={el.advantages}></DroneCard>
            )}
            {console.log(localStorage)}
        </DronesStyled>
    )
}