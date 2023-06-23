import styled from "styled-components";

export const CityCard = styled.div`
    position: relative;
    background-color: rgba(141, 164, 241, 1);
    border: 2px solid rgba(141, 164, 241, 1);
    border-radius: 5px;
    padding: 3px 30px 3px 10px;
    margin: 3px 5px 3px 0px;
    display: flex;
    flex-direction: row;
`

export const ServiceCard = styled(CityCard)`
    background-color: rgba(170, 155, 202, 1);
    border: 2px solid rgba(170, 155, 202, 1)
`

export const DeleteBtn = styled.button`
    background-color: #fff;
    border: none;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
      cursor: pointer;
    }
`