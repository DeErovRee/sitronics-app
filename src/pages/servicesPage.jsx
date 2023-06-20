import React from "react";
import styled from "styled-components";
import { Services } from "./servicePageComponent/services";

export const ServicesStyled = styled.div`
  display: flex;
  justify-content: center;
  background-image: ${props => props.theme.colors.gradient};
  color: white;
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const H1 = styled.h1`
  margin: 40px 0;
`

export const ServicesPage = () => {

  return (
    <ServicesStyled>
      <Wrapper>
        <H1>Услуги</H1>
        <Services />
      </Wrapper>
    </ServicesStyled>      
  );
};
