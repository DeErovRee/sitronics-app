import React from "react";
import styled from 'styled-components'

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
    padding: 37px 37px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  align-items: ${props => props.alignItems || 'felx-start'};
  margin: ${props => props.margin || '0'};

  @media${props => props.theme.media.tablet} {
    flex-direction: column;
  }
`

const H2 = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 59px;
  text-transform: uppercase;
  white-space: nowrap;
  margin: ${props => props.margin || '0'};

  @media${props => props.theme.media.tablet} {
    margin: 0;
    font-size: 31px;
  }
`

const H5 = styled.h4`
  font-size: 20px;
  font-weight: 300;
  line-height: 28px;

  @media${props => props.theme.media.tablet} {
    font-size: 18px;
  }
`

const TextDecor = styled.span`
  white-space: break-spaces;
  font-weight: 700;
  color: #4285F4;
`

export const MainComponent2 = () => {
    return(
        <Content backgroundColor={'background-color: #1E1E1E'} padding={'77px 89px'}>
          <Container alignItems={'center'}>
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
    )
}