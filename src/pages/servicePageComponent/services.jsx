import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { CityCard, ServiceCard } from '../../styles/generalStyledComponents'
import _ from 'lodash'

const Container = styled.div`
    width: 900px;
    display: flex;
    margin: 0px 0px 0px 20px;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 10px 0 10px;

    a {
        width: 100%;
        display: flex;
        text-decoration: none;
        color: black;
    }

    @media (max-width: 950px) {
        width: 95%;
        margin: 0 10px;
        a {
            max-width: 100%;
        }
    }
`

const Card = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    border-radius: 24px;
    padding: 14px;
    margin-bottom: 10px;

    @media (max-width: 520px) {
        flex-direction: column;
        margin-top: 5px;
        margin-bottom: 0;
        border-radius: 10px;
    }
`

const Img = styled.div`
    position: relative;
    margin: 0 14px 0 0;

    img {
        width: 200px;
        height: auto;
    }
`

const CardInfo = styled.div`
    width: 100%;
`

const Rating = styled.div`
    display: flex;
    align-items: center;

    img {
        border-radius: 0px;
        margin: 0 3px 0 0;
    }
`

const Input = styled.input`
    display: none;
`

const Sort = styled.div`
    box-sizing: border-box;
    margin: 0 0 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: white;
    align-items: center;
    border-radius: 0 10px 10px;
    justify-content: space-around;
`

const SortBtn = styled.button`
    color: black;
    display: flex;
    height: 50px;
    width: 50%;
    background-color: inherit;
    border-radius: 10px;
    margin: 3px;
    padding: 7px;
    border: 1px solid rgb(217, 217, 217);
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const SortInput = styled.input`
    box-sizing: border-box;
    height: 50px;
    width: 50%;
    background-color: inherit;
    border-radius: 10px;
    margin: 3px;
    padding: 7px;
    border: 1px solid rgb(217, 217, 217);
    align-items: center;
    text-align: center;

    &::placeholder {
        text-align: center;
        color: black;
    }
    &::-webkit-input-placeholder {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    &::-moz-placeholder {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    &:-moz-placeholder {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    &:-ms-input-placeholder {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    &:focus::-webkit-input-placeholder {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    &:focus::-moz-placeholder {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    &:focus:-moz-placeholder {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    &:focus:-ms-input-placeholder {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    outline: none;
`

const SortP = styled.p`
    margin: 0 0 -1px 0;
    color: black;
    border-radius: 10px 10px 0 0;
    background-color: white;
    padding: 10px;
`

const FakeImg = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 20px;
    background: linear-gradient(149deg, #dfdfdf 0%, transparent 42%, #dfdfdf 72%, transparent 100%);
    animation: gradient 10s infinite linear; // 10s - скорость анимации
    background-size: 400%; // Можно менять и подбирать интенсивность

    @keyframes gradient {
        0% {
            background-position: 80% 0%;
        }
        50% {
            background-position: 20% 100%;
        }
        100% {
            background-position: 80% 0%;
        }
    }
`

const LoadingDiv = styled(FakeImg)`
    border-radius: 20px;
    width: 200px;
    height: 27.6px;
`

const LoadingCityCard = styled(CityCard)`
    height: 18.4px;
    width: 75px;
    background: linear-gradient(149deg, #dfdfdf 0%, transparent 42%, #dfdfdf 72%, transparent 100%);
    animation: gradient 10s infinite linear; // 10s - скорость анимации
    background-size: 400%; // Можно менять и подбирать интенсивность

    @keyframes gradient {
        0% {
            background-position: 80% 0%;
        }
        50% {
            background-position: 20% 100%;
        }
        100% {
            background-position: 80% 0%;
        }
    }
`

export const Services = () => {
    const [servicesList, setServicesList] = useState([])
    const [sortRating, setSortRating] = useState(true)
    const [sortReviews, setSortReviews] = useState(true)
    const [filter, setFilter] = useState([])
    const [inputCity, setInputCity] = useState('')
    const [inputService, setInputService] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const Filters = (e) => {
        try {
            if (e.keyCode !== 13) {
                return
            }
            e.target.style.border = '1px solid rgb(217, 217, 217)'
            e.target.blur()

            const regexpCity = new RegExp(`${inputCity}`, 'i')
            const regexpService = new RegExp(`${inputService}`, 'i')

            const arrCity = servicesList.filter((el) => regexpCity.test(el.citys))
            const arrService = servicesList.filter((el) => regexpService.test(el.services))
            setFilter(_.intersection(arrCity, arrService))
        } catch {
            e.target.style.border = '2px solid red'
        }
    }

    const getServices = async () => {
        setIsLoading(true)
        // При React.strictMode в index.js функция вызывается 2 раза
        const q = query(collection(db, 'providerPages'), where('visibility', '==', true))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setServicesList((prevState) => [...prevState, doc.data()])
            setFilter((prevState) => [...prevState, doc.data()])
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getServices()
    }, [])

    const ratingSort = () => {
        if (sortRating === true) {
            setFilter(
                filter.sort((a, b) => {
                    if (a.ratingValue > b.ratingValue) {
                        return -1
                    } else {
                        return +1
                    }
                }),
            )
            setSortRating(false)
        }
        if (sortRating === false) {
            setFilter(
                filter.sort((a, b) => {
                    if (a.ratingValue > b.ratingValue) {
                        return +1
                    } else {
                        return -1
                    }
                }),
            )
            setSortRating(true)
        }
    }

    const reviewsSort = () => {
        if (sortReviews === true) {
            setFilter(
                filter.sort((a, b) => {
                    if (a.ratingCount > b.ratingCount) {
                        return -1
                    } else {
                        return +1
                    }
                }),
            )
            setSortReviews(false)
        }
        if (sortReviews === false) {
            setFilter(
                filter.sort((a, b) => {
                    if (a.ratingCount > b.ratingCount) {
                        return +1
                    } else {
                        return -1
                    }
                }),
            )
            setSortReviews(true)
        }
    }

    return (
        <Container>
            <SortP>Сортировать</SortP>
            <Sort>
                <SortBtn onClick={() => ratingSort()}>по рейтингу</SortBtn>
                <SortBtn onClick={() => reviewsSort()}>по кол-ву отзывов</SortBtn>
            </Sort>
            <SortP>Поиск</SortP>
            <Sort>
                <SortInput
                    type='text'
                    placeholder='по городу'
                    value={inputCity}
                    onKeyDown={(e) => Filters(e)}
                    onChange={(e) => {
                        setInputCity(e.target.value)
                    }}
                />

                <SortInput
                    type='text'
                    placeholder='по услуге'
                    value={inputService}
                    onKeyDown={(e) => Filters(e)}
                    onChange={(e) => {
                        setInputService(e.target.value)
                    }}
                />
            </Sort>

            {isLoading
                ? [...Array(5)].map((el) => {
                      return (
                          <Card>
                              <Img>
                                  <FakeImg></FakeImg>
                              </Img>
                              <CardInfo>
                                  <LoadingDiv></LoadingDiv>
                                  <Rating>
                                      {[...Array(5)].map((star, i) => {
                                          return (
                                              <label key={nanoid()}>
                                                  <Input type='radio' name='rating' value={0} />
                                                  <svg
                                                      width='35px'
                                                      height='35px'
                                                      viewBox='0 0 24 24'
                                                      fill='#dfdfdf'
                                                      xmlns='http://www.w3.org/2000/svg'
                                                  >
                                                      {/* <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> */}
                                                      <path d='M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z' />
                                                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M38.364,41.192l7.071,7.072a2,2,0,1,0,2.829-2.829l-7.072-7.071a9.01,9.01,0,0,1,0-12.728l7.072-7.071a2,2,0,1,0-2.829-2.829l-7.071,7.072a9.012,9.012,0,0,1-12.728,0l-7.071-7.072a2,2,0,0,0-2.829,2.829l7.072,7.071a9.01,9.01,0,0,1,0,12.728l-7.072,7.071a2,2,0,1,0,2.829,2.829l7.071-7.072A9.012,9.012,0,0,1,38.364,41.192ZM29,32a3,3,0,1,1,3,3A3,3,0,0,1,29,32Z"/><circle cx="32" cy="32" r="1"/><path d="M14,24a10.094,10.094,0,0,0,3.651-.692l-3.329-3.329a4,4,0,0,1,5.657-5.657l3.329,3.329A10,10,0,1,0,14,24Zm1-12a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5,1,1,0,0,1,0,2Zm0-6a1,1,0,0,1,0,2,7.008,7.008,0,0,0-7,7,1,1,0,0,1-2,0A9.011,9.011,0,0,1,15,6Z"/><path d="M23.311,46.346l-3.332,3.332a4,4,0,0,1-5.657-5.657L17.648,40.7A10,10,0,1,0,24,50,9.9,9.9,0,0,0,23.311,46.346ZM15,58a9.011,9.011,0,0,1-9-9,1,1,0,0,1,2,0,7.008,7.008,0,0,0,7,7,1,1,0,0,1,0,2Zm0-4a5.006,5.006,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3,1,1,0,0,1,0,2Z"/><path d="M40.7,17.648l3.326-3.326a4,4,0,0,1,5.657,5.657l-3.332,3.332A9.9,9.9,0,0,0,50,24a10.018,10.018,0,1,0-9.3-6.352ZM49,6a9.011,9.011,0,0,1,9,9,1,1,0,0,1-2,0,7.008,7.008,0,0,0-7-7,1,1,0,0,1,0-2Zm0,4a5.006,5.006,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3,1,1,0,0,1,0-2Z"/><path d="M50,40a9.815,9.815,0,0,0-3.651.692l3.329,3.329a4,4,0,0,1-5.657,5.657l-3.329-3.329A9.819,9.819,0,0,0,40,50,10,10,0,1,0,50,40ZM49,52a3,3,0,0,0,3-3,1,1,0,0,1,2,0,5.006,5.006,0,0,1-5,5,1,1,0,0,1,0-2Zm0,6a1,1,0,0,1,0-2,7.008,7.008,0,0,0,7-7,1,1,0,0,1,2,0A9.011,9.011,0,0,1,49,58Z"/></g></svg> */}
                                                  </svg>
                                              </label>
                                          )
                                      })}
                                  </Rating>
                                  <div className='services'>
                                      <p style={{ color: '#dfdfdf' }}>Услуги: </p>
                                      {[...Array(5)].map((el) => {
                                          return <LoadingCityCard key={nanoid()}>{el}</LoadingCityCard>
                                      })}
                                  </div>
                                  <div className='citys'>
                                      <p style={{ color: '#dfdfdf' }}>Города: </p>
                                      {[...Array(5)].map((el) => {
                                          return <LoadingCityCard key={nanoid()}></LoadingCityCard>
                                      })}
                                  </div>
                              </CardInfo>
                          </Card>
                      )
                  })
                : filter.map((service) => {
                      return (
                          <Link to={{ pathname: service.uid }} key={nanoid()}>
                              <Card>
                                  <Img>
                                      <img className='providerImg' src={`${service.userPhoto}`} alt='' />
                                  </Img>
                                  <CardInfo>
                                      <h2>{service.displayName}</h2>
                                      <Rating>
                                          {[...Array(5)].map((star, i) => {
                                              const ratingValue = i + 1
                                              return (
                                                  <label key={nanoid()}>
                                                      <Input type='radio' name='rating' value={ratingValue} />
                                                      <svg
                                                          width='35px'
                                                          height='35px'
                                                          viewBox='0 0 24 24'
                                                          // stroke={ratingValue > (hover || rating) ? 'grey' : 'black'}
                                                          fill={
                                                              ratingValue > Math.round(service.ratingValue)
                                                                  ? '#d4d4d4'
                                                                  : 'gold'
                                                          }
                                                          xmlns='http://www.w3.org/2000/svg'
                                                      >
                                                          {/* <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> */}

                                                          <path d='M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z' />

                                                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M38.364,41.192l7.071,7.072a2,2,0,1,0,2.829-2.829l-7.072-7.071a9.01,9.01,0,0,1,0-12.728l7.072-7.071a2,2,0,1,0-2.829-2.829l-7.071,7.072a9.012,9.012,0,0,1-12.728,0l-7.071-7.072a2,2,0,0,0-2.829,2.829l7.072,7.071a9.01,9.01,0,0,1,0,12.728l-7.072,7.071a2,2,0,1,0,2.829,2.829l7.071-7.072A9.012,9.012,0,0,1,38.364,41.192ZM29,32a3,3,0,1,1,3,3A3,3,0,0,1,29,32Z"/><circle cx="32" cy="32" r="1"/><path d="M14,24a10.094,10.094,0,0,0,3.651-.692l-3.329-3.329a4,4,0,0,1,5.657-5.657l3.329,3.329A10,10,0,1,0,14,24Zm1-12a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5,1,1,0,0,1,0,2Zm0-6a1,1,0,0,1,0,2,7.008,7.008,0,0,0-7,7,1,1,0,0,1-2,0A9.011,9.011,0,0,1,15,6Z"/><path d="M23.311,46.346l-3.332,3.332a4,4,0,0,1-5.657-5.657L17.648,40.7A10,10,0,1,0,24,50,9.9,9.9,0,0,0,23.311,46.346ZM15,58a9.011,9.011,0,0,1-9-9,1,1,0,0,1,2,0,7.008,7.008,0,0,0,7,7,1,1,0,0,1,0,2Zm0-4a5.006,5.006,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3,1,1,0,0,1,0,2Z"/><path d="M40.7,17.648l3.326-3.326a4,4,0,0,1,5.657,5.657l-3.332,3.332A9.9,9.9,0,0,0,50,24a10.018,10.018,0,1,0-9.3-6.352ZM49,6a9.011,9.011,0,0,1,9,9,1,1,0,0,1-2,0,7.008,7.008,0,0,0-7-7,1,1,0,0,1,0-2Zm0,4a5.006,5.006,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3,1,1,0,0,1,0-2Z"/><path d="M50,40a9.815,9.815,0,0,0-3.651.692l3.329,3.329a4,4,0,0,1-5.657,5.657l-3.329-3.329A9.819,9.819,0,0,0,40,50,10,10,0,1,0,50,40ZM49,52a3,3,0,0,0,3-3,1,1,0,0,1,2,0,5.006,5.006,0,0,1-5,5,1,1,0,0,1,0-2Zm0,6a1,1,0,0,1,0-2,7.008,7.008,0,0,0,7-7,1,1,0,0,1,2,0A9.011,9.011,0,0,1,49,58Z"/></g></svg> */}
                                                      </svg>
                                                  </label>
                                              )
                                          })}
                                          <p>{service.ratingValue}</p>
                                      </Rating>

                                      <div className='services'>
                                          <p>Услуги: </p>
                                          {service.services.map((el) => {
                                              return <ServiceCard key={nanoid()}>{el}</ServiceCard>
                                          })}
                                      </div>
                                      <div className='citys'>
                                          <p>Города: </p>
                                          {service.citys.map((el) => {
                                              return <CityCard key={nanoid()}>{el}</CityCard>
                                          })}
                                      </div>
                                  </CardInfo>
                              </Card>
                          </Link>
                      )
                  })}
        </Container>
    )
}
