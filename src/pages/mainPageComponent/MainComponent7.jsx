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
    padding: 16px 13px;
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

  @media${props => props.theme.media.tablet} {
    a {
      svg {
        width: 15px;
      }
    }
  }
`

const H3 = styled.h3`
  font-size: 32px;
  font-weight: 200;
  line-height: 40px;

  @media${props => props.theme.media.tablet} {
    font-size: 14px;
  }
`

const TextDecor = styled.span`
  white-space: break-spaces;
  font-weight: 700;
  color: #4285F4;
`

export const MainComponent7 = () => {
    return(
        <Content padding={'38px 85px'} backgroundColor={'linear-gradient(45deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))'}>
          <Container >
            <a href='/services' style={{ textDecoration: 'none', color: '#4285F4', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <svg style={{margin: '0 16px 0 0'}} width="31" height="52" viewBox="0 0 31 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.73141 51.8334L0.145996 47.248L21.3939 26.0001L0.145996 4.75217L4.73141 0.166748L30.5647 26.0001L4.73141 51.8334Z" fill="#4285F4"/>
              </svg>
              <H3><TextDecor>Оставьте заявку уже сейчас</TextDecor></H3>
            </a>
          </Container>
        </Content>
    )
}