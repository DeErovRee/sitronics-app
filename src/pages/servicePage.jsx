import React, { useContext, useEffect, useState } from "react";
import DOMPurify from 'dompurify'
import { nanoid } from "nanoid";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import { Review } from "./servicePageComponent/review";
import { CityCard, ServiceCard } from "../styles/generalStyledComponents";

const Reviews = styled.div`
    margin: 0 10px 50px;
    
    @media (max-width: 1024px) {
        margin: 0 0 10px 0;
    }
`

const ServicePageStyled = styled.div`
    max-width: 1920px;
    padding: 0 96px;
    display: flex;
    flex-direction: column;
    background-color: white;
    background-image: ${props => props.theme.colors.gradient};

    @media (max-width: 768px) {
        padding: 0 32px;
    }
`

const ProviderMainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px 0 50px 0;

    @media (max-width: 768px) {
        flex-direction: column;
        margin: 20px 0 20px 0;
    }
`

const ContainerImg = styled.div`
    position: relative;
    margin: 0 15px 0 0;
`

const ProviderImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 20px;
`

const ProviderInfo = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`

const Left = styled.div`
    width: 50%;

    @media (max-width: 1024px) {
        width: 100%;
    }
`

const Right = styled.div`
    width: 50%;
    color: white;

    @media (max-width: 1024px) {
        width: 100%;
    }
`

const ProviderPhoto = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 20px;
    margin: 0 10px 10px 0;

    img {
        border: 5px solid rgba(141, 164, 241, 0.5019607843);
        border-radius: 10px;
        height: 125px;
        width: auto;
        margin: 10px;
    }

    @media (max-width: 1024px) {
        margin: 0 0 10px 0;
    }
`

const ServiceForm = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    margin: 0 10px 0 0;
    background-color: #1e1e1e;
    padding: 20px;

    input, select, textarea {
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 0 10px 10px;
        margin:  0 0 5px;
        outline: none;
        border-right: 16px solid transparent;

        ::placeholder {
            color: black;
        }
    }

    button {
        border: none;
        border-radius: 10px;
        text-transform: uppercase;
        padding: 10px;
        background-color: #8da4f1;
    }

    @media (max-width: 1024px) {
        margin: 0 0 10px 0;
    }
`

const Citys = styled.div`
    background-color: #1E1E1E;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const CitysItem = styled.div`
    margin: 5px 5px 5px 0;
    display: flex;
    flex-wrap: wrap;
`

const Text = styled.div`
    background-color: #1E1E1E;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
`

export const ServicePage = () => {

    const [reviews, setReviews] = useState([])

    const getDate = () => {
        let today = new Date();
        const dd = String(today.getDate() + 4).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    const { currentUser } = useContext(AuthContext)

    const pageUrl = document.location.pathname.split('/')[2]
    const provider = JSON.parse(localStorage.getItem(`${pageUrl}`))

    const TextPage = ({text}) => {
        const sanitizedText = DOMPurify.sanitize(text); // очистка текста от потенциально опасных элементов
    
        return (
            <Text dangerouslySetInnerHTML={{ __html: sanitizedText }}></Text>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = document.getElementById('serviceForm')
        const orderID = nanoid()
        try {
            await setDoc(doc(db, 'orders', orderID), {
                orderID: orderID,
                orderService: e.target[0].value,
                orderStatus: 'На рассмотрении',
                orderVisible: true,
                orderRating: false,
                orderRatingValue: 0,
                orderReviews: false,
                clientID: currentUser.uid,
                clientName: currentUser.displayName,
                clientPhoto: currentUser.photoURL,
                clientDate: e.target[4].value,
                clientPhone: e.target[5].value,
                clientEmail: e.target[6].value,
                clientNote: e.target[7].value,
                clientAddress: `${e.target[1].value}, ул.${e.target[2].value}, д.${e.target[3].value}`,
                providerID: provider.uid,
                providerName: provider.displayName,
                providerPhoto: provider.userPhoto,
                providerNote: null,
            })
            console.log("заявка отправлена")
            form.reset()
        } catch(error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userReviews", provider.uid), (doc) => {
            setReviews(doc.data().reviews);
        });
        
        return() => {
            unsub()
        }
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <ServicePageStyled>
            <ProviderMainInfo>
                <ContainerImg >
                    <ProviderImg src={provider.userPhoto} alt="" />
                </ContainerImg>
                <h2>{provider.displayName}</h2>
            </ProviderMainInfo>
            <ProviderInfo>
                <Left>
                    <ProviderPhoto>
                        {provider.photoURLs && provider.photoURLs.map((img) => {
                            return(
                                <img src={img} alt="" key={img} width='100px'/>
                            )
                        })}
                    </ProviderPhoto>
                    {!currentUser.isProvider &&
                        <ServiceForm id="serviceForm" onSubmit={handleSubmit}>
                            <select>
                                <option value="">Выберите услугу</option>
                                {provider && provider.services.map((service) => {
                                    return(
                                        <option value={service}>{service}</option>
                                    )
                                })}
                            </select>
                            <select>
                                <option value="">Выберите город</option>
                                {provider && provider.citys.map((city) => {
                                    return(
                                        <option value={city}>{city}</option>
                                    )
                                })}
                            </select>
                            <input type="text" placeholder="Введите улицу"/>
                            <input type="text" placeholder="Введите номер дома"/>
                            <input type="date" placeholder="Выберите дату" min={getDate()}/>
                            <input type="phone" placeholder="Введите номер телефона"/>
                            <input type="email" placeholder="Введите эл.почту"/>
                            <textarea style={{resize: 'none'}} placeholder="Опишите требуемую задачу"/>
                            <button type="submit">Отправить заявку</button>
                        </ServiceForm>
                    }
                    
                    {reviews && 
                        <Reviews>
                        <h2 style={{margin: '20px 0 10px 0'}}>Отзывы:</h2>
                        {[...reviews].map((review) => {
                            return(
                                <Review review={review} key={nanoid()}/>
                            )
                        })}
                    </Reviews>
                    }
                    
                </Left>
                <Right id="providerTextInfo">
                    <TextPage text={provider.text} />
                    <Citys>
                        <p>Города:</p>
                        <CitysItem>
                        {provider.citys && provider.citys.map((el) => {
                            return(
                                <CityCard>
                                    {el}
                                </CityCard>
                            )
                        })}
                        </CitysItem>
                    </Citys>
                    <Citys>
                        <p>Услуги:</p>
                        <CitysItem>
                        {provider.services && provider.services.map((el) => {
                            return(
                                <ServiceCard>
                                    {el}
                                </ServiceCard>
                            )
                        })}
                        </CitysItem>
                    </Citys>
                </Right>
            </ProviderInfo>
        </ServicePageStyled>
    )
}