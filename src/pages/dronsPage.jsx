import React from "react";
import styled from "styled-components";
import { ServicesStyled, Wrapper } from "./servicesPage";
import { Drones } from "./dronesComponent/drones";

const DronePageStyled = styled(ServicesStyled)`
`

export const DronsPage = () => {
  return (
    <DronePageStyled>
      <Wrapper>
        <h1 style={{margin: '93px 0'}}>ДРОНЫ</h1>
        <Drones/>
      </Wrapper>
    </DronePageStyled>
  );
};
