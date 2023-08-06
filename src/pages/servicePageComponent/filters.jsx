import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #d9d9d9;
    padding: 15px 15px 5px;
    border-radius: 10px;
    width: 231px;
    margin: 10px 0 0 10px;
    box-sizing: border-box;

    @media (max-width: 950px) {
        flex-direction: row;
        background-color: transparent;
        width: 100%;
        align-items: flex-start;
        margin: 0;
        padding: 0;
    }

    @media (max-width: 520px) {
        flex-direction: column;
        align-items: stretch;
        margin: 0px;
        padding: 0px;
    }
`

export const Filter = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: white;
    box-sizing: border-box;

    @media (max-width: 950px) {
        width: 33.333333%;
        border-radius: 0;
    }

    @media (max-width: 520px) {
        width: 100%;
        border-radius: 0;
        margin-bottom: 0px;
    }
`

export const P = styled.p`
    color: black;
`

export const Input = styled.input`
    box-sizing: border-box;
    text-align: center;
    background-color: #e9e9e9;
    border: none;
    border-radius: 5px;
    padding: 3px 8px;
    margin: 10px 0;
    width: 100%;
`

export const Finded = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 0;
`

export const ItemFinded = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 0 8px 0;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;

    p {
        color: black;
    }

    input {
        margin-right: 10px;
    }
`

export const Filters = () => {
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
    const token = 'd0b5a21192e9fd28af54b1e555b7d09ae00a34c7'

    const [regions, setRegions] = useState([])
    const [choiceRegion, setChoiceRegions] = useState('')

    const [citys, setCitys] = useState([])
    const [choiceCity, setChoiceCity] = useState('')

    const [requestReg, setRequestReg] = useState([])
    const [requestCity, setRequestCity] = useState([])

    const getOptions = (request) => {
        let body
        if (request === requestCity) {
            body = {
                query: request,
                from_bound: { value: 'city' },
                to_bound: { value: 'city' },
                locations: [
                    {
                        region_fias_id: choiceRegion,
                    },
                ],
                restrict_value: true,
            }
        } else if (request === requestReg) {
            body = {
                query: request,
                from_bound: { value: 'region' },
                to_bound: { value: 'region' },
            }
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token ' + token,
            },
            body: JSON.stringify(body),
        }

        return options
    }

    const getData = async (options, param) => {
        await fetch(url, options)
            .then((response) => response.text())
            .then((result) => {
                const answer = JSON.parse(result)
                if (param === requestReg) {
                    setRegions(answer.suggestions)
                } else if (param === requestCity) {
                    setCitys(answer.suggestions)
                }
            })
            .catch((error) => console.log('error', error))
    }

    const handleChangeReg = (e) => {
        setRequestReg(e.target.value)
        setRequestCity('')
    }

    const handleChangeCity = (e) => {
        setRequestCity(e.target.value)
    }

    const handleChoiceReg = (e) => {
        setChoiceRegions(e.data.region_fias_id)
    }

    const handleChoiceCity = (e) => {
        setChoiceCity(e.target.innerText)
    }

    useEffect(() => {
        getData(getOptions(requestReg, choiceRegion), requestReg)

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestReg])

    useEffect(() => {
        getData(getOptions(requestCity, choiceCity), requestCity)

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestCity])

    return (
        <Container>
            <Filter>
                <P>Услуги</P>
                <Input type='text' placeholder='Поиск' />
                <Finded></Finded>
            </Filter>

            <Filter>
                <P>Регион</P>
                <Input type='text' value={requestReg} onChange={handleChangeReg} placeholder='Поиск' />
                <Finded>
                    {regions &&
                        regions.map((region) => {
                            return (
                                <ItemFinded key={nanoid()}>
                                    <input type='checkbox' className='checkbox' />
                                    <p onClick={(e) => handleChoiceReg(region)}>{region.value}</p>
                                </ItemFinded>
                            )
                        })}
                </Finded>
            </Filter>

            <Filter>
                <P>Город</P>
                <Input type='text' value={requestCity} onChange={handleChangeCity} placeholder='Поиск' />
                <Finded>
                    {citys &&
                        citys.map((city) => {
                            return (
                                <ItemFinded key={nanoid()}>
                                    <input type='checkbox' className='checkbox' />
                                    <p onClick={handleChoiceCity}>{city.value}</p>
                                </ItemFinded>
                            )
                        })}
                </Finded>
            </Filter>
        </Container>
    )
}
