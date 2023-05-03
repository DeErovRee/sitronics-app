import React from "react";
import styled from "styled-components";

const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${props => props.padding || '0'};

    background-image: 
        ${props => props.backgroundColor || props.theme.colors.gradient},
        url(${props => props.img});
    
    background-size: cover;
    background-position: center;
    
    @media${props => props.theme.media.tablet} {
        padding: 41px 28px;
    }
`

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  width: ${props => props.width || '100%'};
  align-items: ${props => props.alignItems || 'felx-start'};
  margin: ${props => props.margin || '0'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  justify-content: ${props => props.justifyContent || 'flex-start'};

  @media(max-width: 712px) {
    flex-direction: column;
    align-items: center;
  }
`

const Card = styled.div`
    margin: 12px 25px;
    width: 50%;
    padding: 27px 36px;
    border-radius: 23px;
    background-image: linear-gradient(45deg, rgba(30, 30, 30, 0.72), rgba(30, 30, 30, 0.72));
    color:  white;

    @media(max-width: 712px) {
        box-sizing: border-box;
        width: 100%;
        padding: 15px;
    }
`

const H2 = styled.div`
  font-size: 48px;
  font-weight: 500;
  line-height: 59px;
  text-transform: uppercase;
  white-space: nowrap;
  margin: ${props => props.margin || '0'};

  @media(max-width: 950px) {
    font-size: 36px;
  }

  @media${props => props.theme.media.phone} {
    font-size: 25px;
  }
`

const TextBold = styled.span`
  font-weight: 500;
`

const P = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin: ${props => props.margin || '0'};

  @media(950px) {
    font-size: 13px;
  }
`

export const MainComponent5 = () => {
    return(
        <Content padding={'67px 89px 170px'} img={require('../../images/Rectangle.png')}>
          <Container flexDirection={'column'} alignItems={'center'}>
            <H2 margin={'0 0 40px 0'}>Почему мы?</H2>
            <Container>
              <Card>
                <P margin={'0 0 20px 0'}>
                  <TextBold>Профессиональный подход</TextBold>
                </P>
                <P>
                  Сотрудники центра досконально разбираются в беспилотных технологиях, 
                  поэтому могут посоветовать оптимальную модель дрона, выполнить ремонт любой сложности и осуществить съемку.
                </P>
              </Card>
              <Card>
                <P margin={'0 0 20px 0'}>
                  <TextBold>Большой опыт</TextBold>
                </P>
                <P>
                  Начиная аэросъемкой и заканчивая обнаружением пожаров. Каждый клиент для нас важен и может 
                  рассчитывать на внимательное отношение и компетентную помощь наших специалистов.
                </P>
              </Card>
            </Container>
            <Container>
              <Card>
                <P margin={'0 0 20px 0'}>
                  <TextBold>Постоянное развитие</TextBold>
                </P>
                <P>
                  Индустрия беспилотных технологий очень динамична, и мы всегда в курсе новинок и совершенствуем 
                  свои навыки, чтобы оправдывать ожидания клиентов.
                </P>
              </Card>
              <Card>
                <P margin={'0 0 20px 0'}>
                  <TextBold>Адекватная ценовая политика</TextBold>
                </P>
                <P>
                  Как непосредственный партнер известных брендов-производителей центр может устанавливать наиболее 
                  привлекательные цены, а стоимость услуг определяется в индивидуальном порядке.
                </P>
              </Card>
            </Container>
          </Container>
        </Content>
    )
}