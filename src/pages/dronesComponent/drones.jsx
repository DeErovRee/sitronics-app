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
<<<<<<< Updated upstream
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
=======
        text: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
    {
        url: 'heatvision_drone',
        title: 'Дрон с тепловизором',
        background: bg_heatvision_drone,
<<<<<<< Updated upstream
        description: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: ['Экономия посевных площадей', 'Экономия на химикатах до 18%', 'Выполнение работ на любой почве', 'Работа в ночное время']
=======
        text: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
    {
        url: 'sprinkler_drone',
        title: 'Дрон ороситель',
        background: bg_sprinkler_drone,
<<<<<<< Updated upstream
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
=======
        text: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
    {
        url: 'firefighter_drone',
        title: 'Дрон обнаружитель пожаров',
        background: bg_firefighter_drone,
<<<<<<< Updated upstream
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
=======
        text: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
    {
        url: 'liserscan_drone',
        title: 'Дрон с лазерным сканером',
        background: bg_liserscan_drone,
<<<<<<< Updated upstream
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
=======
        text: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
    {
        url: 'shepherd_drone',
        title: 'Дрон для учета животных',
        background: bg_shepherd_drone,
<<<<<<< Updated upstream
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
=======
        text: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: [
            'Экономия посевных площадей',
            'Экономия на химикатах до 18%',
            'Выполнение работ на любой почве',
            'Работа в ночное время',
        ]
>>>>>>> Stashed changes
    },
]

const DronesStyled = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 863px;
    width: 100%;
    align-items: center;

    @media (max-width: 950px) {
        padding: 10px;
    }
`

export const Drones = () => {

    localStorage.setItem('DronesPage', JSON.stringify(DronesArr))

    return(
        <DronesStyled>
            {DronesArr.map(el => 
                <DroneCard 
                    title={el.title}
                    background={el.background}
<<<<<<< Updated upstream
                    url={el.url}
                    description={el.description}
                    advantages={el.advantages}></DroneCard>
=======
                    url={el.url} />
>>>>>>> Stashed changes
            )}
            {console.log(localStorage)}
        </DronesStyled>
    )
}