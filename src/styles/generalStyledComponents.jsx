import styled from "styled-components";

export const CityCard = styled.div`
    background-color: rgba(141, 164, 241, 1);
    border-radius: 5px;
    padding: 3px 10px;
    margin: 3px 5px 3px 0px;
    display: flex;
    flex-direction: row;
`

export const ServiceCard = styled(CityCard)`
    background-color: rgba(170, 155, 202, 1);
`

export const DeleteBtn = styled.button`
    background-color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
`