import { Sidebar } from "./personalPageComponent/sidebar";
import { OptionalWindow } from "./personalPageComponent/optionalWindow";
import { ServicesStyled, Wrapper } from "./servicesPage";
import styled from "styled-components";

const PersonalStyled = styled(ServicesStyled)``

const PersonalWrapper = styled(Wrapper)`
  max-width: 820px;
`

const PersonalArea = styled.div`
  max-width: 1200px;
  display: flex;
  padding-bottom: 100px;
  align-self: flex-start;

  @media (max-width: 625px) {
    flex-direction: column;
    align-self: center;
  }
`

const H1 = styled.h1`
  text-align: center;
  margin: 50px 0 97px;
  font-weight: 500;
  color: white;

  @media (max-width: 625px) {
    margin: 33px 0 40px;
  }
`


export const PersonalAreaPage = () => {

  return (
      <PersonalStyled>
        <PersonalWrapper>
          <H1>Личный кабинет</H1>
          <PersonalArea>
            <Sidebar />
            <OptionalWindow />
          </PersonalArea>
        </PersonalWrapper>
      </PersonalStyled>
  );
};
