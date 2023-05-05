import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Sort } from './servicePageComponent/sort'
import { Filters } from "./servicePageComponent/filters";
import { Services } from "./servicePageComponent/services";

const ServicesStyled = styled.div`
  display: flex;
  justify-content: center;
  background-image: ${props => props.theme.colors.gradient};
  color: white;
`

const Wrapper = styled.div`
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media(max-width: 950px) {
    flex-direction: column;
    width: 100%;
  }
`

export const ServicesPage = () => {

  return (
    <ServicesStyled>
      <Wrapper>
        <H1>Услуги</H1>
        <Sort />
        <Container>
          <Filters />
          <Services />
        </Container>
      </Wrapper>
    </ServicesStyled>      
  );
};
