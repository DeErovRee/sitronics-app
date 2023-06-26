import React from "react"; 
import styled from "styled-components";
import { DroneCard } from "./droneCard";
import card_bg_delivery_drone from '../../images/Background.png'
import card_bg_heatvision_drone from '../../images/dron_1.png'
import card_bg_sprinkler_drone from '../../images/dron_2.png'
import card_bg_firefighter_drone from '../../images/dron_3.png'
import card_bg_liserscan_drone from '../../images/dron_4.png'
import card_bg_shepherd_drone from '../../images/dron_5.png'

import page_bg_delivery_drone from '../../images/delivery_drone.png'
import page_bg_heatvision_drone from '../../images/heatvision_drone.png'
import page_bg_sprinkler_drone from '../../images/sprinkler_drone.png'
import page_bg_firefighter_drone from '../../images/firefighter_drone.png'
import page_bg_liserscan_drone from '../../images/liserscan_drone.png'
import page_bg_shepherd_drone from '../../images/shepherd_drone.png'

const DronesArr = [
    {
        url: 'delivery_drone',
        title: 'Дрон-доставщик',
        background: card_bg_delivery_drone,
        pageBackground: page_bg_delivery_drone,
        description: 'Идеально подходит для транспортировки посылок, медикаментов, продуктов питания или других товаров',
        advantages: ['Низкая стоимость', 'Минимальное время доставки', 'Отсутствие препятсвий', 'Качество доставки']
    },
    {
        url: 'heatvision_drone',
        title: 'Дрон с тепловизором',
        background: card_bg_heatvision_drone,
        pageBackground: page_bg_heatvision_drone,
        description: 'Дроны с тепловизионными камерами и ночным видением для поисково-спасательных работ, проверки линий электропередач, мониторинга дикой территории и прочих задач, проходящих в темное время суток.',
        advantages: ['Высокая точность распознавания объектов', 'Возможность обнаружения скрытых объектов', 'Оперативное реагирование', 'Работа в ночное время']
    },
    {
        url: 'sprinkler_drone',
        title: 'Дрон ороситель',
        background: card_bg_sprinkler_drone,
        pageBackground: page_bg_sprinkler_drone,
        description: 'Сельскохозяйственные дроны для опрыскивания и посева. Автоматизируют и оптимизируют работу, контроль культур в режиме 24/7',
        advantages: ['Экономия посевных площадей', 'Экономия на химикатах до 18%', 'Выполнение работ на любой почве', 'Работа в ночное время']
    },
    {
        url: 'firefighter_drone',
        title: 'Дрон обнаружитель пожаров',
        background: card_bg_firefighter_drone,
        pageBackground: page_bg_firefighter_drone,
        description: 'Дрон-обнаружитель пожаров для быстрого обнаружения возгораний и предотвращения распространения огня',
        advantages: ['Обследование огромных территорий', 'Полеты над труднодоступными территориями', 'Выявление скрытых очагов возгорания', 'Работа в ночное время']
    },
    {
        url: 'liserscan_drone',
        title: 'Дрон с лазерным сканером',
        background: card_bg_liserscan_drone,
        pageBackground: page_bg_liserscan_drone,
        description: 'Современное решение для контроля и сканирования территорий.',
        advantages: ['Уменьшение трудовых затрат', 'Экономия материальных ресурсов', 'Улучшение качества картогрфических продуктов', 'Работа в ночное время']
    },
    {
        url: 'shepherd_drone',
        title: 'Дрон для учета животных',
        background: card_bg_shepherd_drone,
        pageBackground: page_bg_shepherd_drone,
        description: 'Значительно упрощает контроль численности животных по сравнению с традиционными методами',
        advantages: ['Сокращение времени и затрат на учет', 'Увеличение эффективности учета животных', 'Возможность отслеживания миграции', 'Получение данных из труднодоступных мест']
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
                    pageBackground={el.pageBackground}
                    url={el.url}
                    description={el.description}
                    advantages={el.advantages}></DroneCard>
            )}
            {console.log(localStorage)}
        </DronesStyled>
    )
}