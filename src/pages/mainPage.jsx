import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

const MainStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1E1E1E;
  color: white;
`

const Wrapper = styled.nav`
  width: 100%;
  max-width: 1920px;

  @media ${props => props.theme.media.tablet} {
    
  }

  @media ${props => props.theme.media.phone} {
    
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.padding || '0'};

  background-image: 
    ${props => props.backgroundColor || props.theme.colors.gradient},
    url(${props => props.img});
  
  background-size: cover;
  background-position: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  width: ${props => props.width || '100%'};
  align-items: ${props => props.alignItems || 'felx-start'};
  margin: ${props => props.margin || '0'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  justify-content: ${props => props.justifyContent || 'flex-start'};

`

const Card = styled.div`
  margin: 12px 25px;
  width: 50%;
  padding: 41px 26px 36px;
  border-radius: 23px;
  background-image: linear-gradient(45deg, rgba(30, 30, 30, 0.72), rgba(30, 30, 30, 0.72));
  color:  white;
`

const ProviderCard = styled.img`
  border-radius: 20px;
  margin: 20px 30px;
`

const H2 = styled.div`
  font-size: 48px;
  font-weight: 500;
  line-height: 59px;
  text-transform: uppercase;
  white-space: nowrap;
  margin: ${props => props.margin || '0'};
`

const H3 = styled.h3`
  font-size: 38px;
  font-weight: 200;
  line-height: 40px;
`

const H4 = styled.div`
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  margin: ${props => props.margin || '0'}
`

const H5 = styled.h4`
  font-size: 25px;
  font-weight: 300;
  line-height: 28px;
`

const TextDecor = styled.span`
  white-space: break-spaces;
  font-weight: 700;
  color: #4285F4;
`

const TextBold = styled.span`
  font-weight: 500;
`

const Button = styled.button`

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: white;
    padding: 12px 46px;

    p {
      height: auto;
    }
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid white;
  background: transparent;
  color: white;
  margin: ${props => props.margin || '0'};

  svg {
    width: 25px;
  }
`

const P = styled.p`
  font-size: 25px;
  font-weight: 200;
  margin: ${props => props.margin || '0'};
`

export const MainPage = () => {
  return (
    <MainStyled>
      <Wrapper>
        <Content img={require('../images/white-drone-hovering-bright-blue-sky.png')} padding={'244px 89px'}>
          <Container flexDirection={'column'} width={'150%'} alignItems={'flex-start'}>
            <H3>
            Широкий спектр услуг в области беспилотных технологий.
            </H3>
            <H3>
              Получи <TextDecor>профессиональную</TextDecor> съемку уже сейчас!
            </H3>
            <Button margin={'35px 0 0 0'} >
              <a href='/services'>
                <P margin={'0 15px 0 0'}>
                Оставить заявку
                </P>
                <svg width="43" height="19" viewBox="0 0 43 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.5208 18.2916C24.9791 17.9583 24.7191 17.5555 24.7408 17.0833C24.7624 16.611 25.045 16.2083 25.5885 15.8749L33.2395 11.1666H3.04159C2.27423 11.1666 1.63055 11.0066 1.11055 10.6866C0.590553 10.3666 0.331456 9.97103 0.333261 9.49992C0.333261 9.0277 0.593262 8.63159 1.11326 8.31159C1.63326 7.99159 2.27604 7.83214 3.04159 7.83325H33.2395L25.5208 3.08325C24.9791 2.74992 24.7083 2.35381 24.7083 1.89492C24.7083 1.43603 24.9791 1.04047 25.5208 0.708252C26.0624 0.374918 26.7061 0.208252 27.4518 0.208252C28.1975 0.208252 28.8403 0.374918 29.3801 0.708252L41.7707 8.33325C42.0416 8.49992 42.2339 8.68048 42.3476 8.87492C42.4614 9.06936 42.5173 9.2777 42.5155 9.49992C42.5155 9.72214 42.4587 9.93048 42.3449 10.1249C42.2312 10.3194 42.0398 10.4999 41.7707 10.6666L29.3124 18.3333C28.8159 18.6388 28.1957 18.7916 27.4518 18.7916C26.7079 18.7916 26.0642 18.6249 25.5208 18.2916Z" fill="white"/>
                </svg>
              </a>
            </Button>
          </Container>
          <Container></Container>
        </Content>
        <Content backgroundColor={'background-color: #1E1E1E'} padding={'77px 89px'}>
          <Container width={'100%'} alignContent={'space-between'} alignItems={'center'}>
            <H2 margin={'0 20px 0 0'}>
              о проекте
            </H2>
            <H5>
            <TextDecor>Sitronics Drones</TextDecor> – инновационный проект, раскрывающий потенциал 
              использования беспилотных летательных аппаратов в самых разнообразных 
              сферах деятельности.
            </H5>
          </Container>
        </Content>
        <Content img={require('../images/Sitronics-1.png')} padding={'108px 89px 343px'}>
          <Container>
            <Container flexDirection={'column'} margin={'0 60px 0 0'}>
              <Container margin={'0 0 31px 0'} alignItems={'center'}>
                <img src={require('../images/arrow-small-right.png')} alt="" />
                <H4 margin={'0 0 0 8px'}>Кому подойдет?</H4>
              </Container>
              <P>Мы в равной степени ориентированы на профессионалов и новичков, 
                только открывающих для себя и своего бизнеса мир беспилотных технологий.</P>
            </Container>
            <Container flexDirection={'column'} alignItems={'center'}>
              <Container margin={'0 0 31px 0'}>
                <img src={require('../images/arrow-small-right.png')} alt="" />
                <H4 margin={'0 0 0 8px'}>Для чего?</H4>
              </Container>
              <P>
                Быстро и эффективно решаем задачи, связанные с аэрофотосъемкой, геодезией, трехмерным 
                моделированием и визуализацией объектов исторического наследия, предприятий, и городов т.д.
              </P>
            </Container>
          </Container>
        </Content>
        <Content backgroundColor={'background-color: #1E1E1E'} padding={'100px 89px'}>
          <Container alignItems={'center'}>
            <Container width={'30%'}>
              <H2>
                <TextDecor>Основные поставщики услуг</TextDecor>
              </H2>
            </Container>
            <Container wrap={'wrap'} width={'70%'} justifyContent={'flex-end'}>

              <ProviderCard src={require("../images/albatros_logo.png")} alt="" />
              <ProviderCard src={require("../images/coex_logo.png")} alt="" />
              <ProviderCard src={require("../images/geoscan_logo.png")} alt="" />
              <ProviderCard src={require("../images/supercam_logo.png")} alt="" />
              <ProviderCard src={require("../images/drone_center_logo.png")} alt="" />
              <ProviderCard src={require("../images/aerodyne_logo.png")} alt="" />
            </Container>
          </Container>
        </Content>
        <Content padding={'67px 89px 170px'} img={require('../images/Rectangle.png')}>
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
        <Content padding={'52px 89px'} backgroundColor={'background-color: #1E1E1E'}>
          <Container alignContent={'center'} alignItems={'center'} justifyContent={'space-between'}>
            <Container flexDirection={'column'} width={'60%'} >
              <P>
                <TextBold>Возникли вопросы?</TextBold>
              </P>
              <P>Обращайтесь к нам с <TextDecor>любой проблемой</TextDecor> – команда опытных инженеров, 
                пилотов, менеджеров и геодезистов найдет оптимальное решение.</P>
            </Container>
            <Button>
              <a href='/contacts'>
                <P  margin={'0 15px 0 0'}>
                Связаться с нами
                </P>
                <svg width="43" height="19" viewBox="0 0 43 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.5208 18.2916C24.9791 17.9583 24.7191 17.5555 24.7408 17.0833C24.7624 16.611 25.045 16.2083 25.5885 15.8749L33.2395 11.1666H3.04159C2.27423 11.1666 1.63055 11.0066 1.11055 10.6866C0.590553 10.3666 0.331456 9.97103 0.333261 9.49992C0.333261 9.0277 0.593262 8.63159 1.11326 8.31159C1.63326 7.99159 2.27604 7.83214 3.04159 7.83325H33.2395L25.5208 3.08325C24.9791 2.74992 24.7083 2.35381 24.7083 1.89492C24.7083 1.43603 24.9791 1.04047 25.5208 0.708252C26.0624 0.374918 26.7061 0.208252 27.4518 0.208252C28.1975 0.208252 28.8403 0.374918 29.3801 0.708252L41.7707 8.33325C42.0416 8.49992 42.2339 8.68048 42.3476 8.87492C42.4614 9.06936 42.5173 9.2777 42.5155 9.49992C42.5155 9.72214 42.4587 9.93048 42.3449 10.1249C42.2312 10.3194 42.0398 10.4999 41.7707 10.6666L29.3124 18.3333C28.8159 18.6388 28.1957 18.7916 27.4518 18.7916C26.7079 18.7916 26.0642 18.6249 25.5208 18.2916Z" fill="white"/>
                </svg>
              </a>
            </Button>
          </Container>
        </Content>
        <Content padding={'52px 89px'} backgroundColor={'linear-gradient(45deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))'}>
          <Container >
            <a href='/services' style={{ textDecoration: 'none', color: '#4285F4', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <svg style={{margin: '0 16px 0 0'}} width="31" height="52" viewBox="0 0 31 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.73141 51.8334L0.145996 47.248L21.3939 26.0001L0.145996 4.75217L4.73141 0.166748L30.5647 26.0001L4.73141 51.8334Z" fill="#4285F4"/>
              </svg>
              <H3><TextDecor>Оставьте заявку уже сейчас</TextDecor></H3>
            </a>
          </Container>
        </Content>
      </Wrapper>
    </MainStyled>
  );
};
