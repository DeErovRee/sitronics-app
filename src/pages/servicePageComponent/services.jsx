import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Container = styled.div`
    display: flex;
    width: 100%;
    margin: 0px 0px 0px 20px;
    flex-direction: column;
    align-items: center;
    margin: 10px 0 0 0;

    a {
        max-width: 600px;
        display: flex;
        text-decoration: none;
        color: black;
    };

    @media(max-width: 950px) {
        a {
            max-width: 95%;
        };
    };

    @media(max-width: 520px) {
        margin: 0;
        a {
            max-width: 98%;
        };
    };
`

const Card = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #d9d9d9;
    border-radius: 24px;
    padding: 14px;
    margin-bottom: 20px;

    @media(max-width: 520px) {
        flex-direction: column;
        margin-top: 5px;
        margin-bottom: 0;
        border-radius: 10px;
    };
`

const Img = styled.div`
    position: relative;
    margin: 0 14px 0 0;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 20px;
    }
`

const CardInfo = styled.div`
`

const Rating = styled.div`
    img {
        border-radius: 0px;
        margin: 0 3px 0 0;
    }
`

export const Services = () => {

    const [servicesList, setServicesList] = useState([])

    const getServices = async () => {
        // При React.strictMode в index.js функция вызывается 2 раза
        const q = query(collection(db, "providerPages"), where("visibility", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setServicesList(prevState => ([...prevState, doc.data()]))
        console.log(doc.data().uid)
        localStorage.setItem(`${doc.data().uid}`, JSON.stringify(doc.data()))
        })
    }

    useEffect(() => {
        getServices()
    }, [])

    return(
            <Container>
                {servicesList && servicesList.map((service) => {
                return(
                <Link to={{ pathname: service.uid }} key={nanoid()}>
                    <Card>
                        <Img >
                            <img className='providerImg' src={`${service.userPhoto}`} alt="" />
                        </Img>
                        <CardInfo>
                            <h5>{service.displayName}</h5>
                            <Rating>
                                <img className='rateImg' src={require('../../images/rate-dron-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-dron-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-dron-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-dron-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-dron-disable.png')} alt="" width='12px'/>
                            </Rating>
                            <Rating>
                                <img className='rateImg' src={require('../../images/rate-ruble-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-ruble-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-ruble-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-ruble-enable.png')} alt="" width='12px'/>
                                <img className='rateImg' src={require('../../images/rate-ruble-disable.png')} alt="" width='12px'/>
                            </Rating>
                            <div className="services">
                                <p>Услуги: </p>
                                {service.services.map((el) => {
                                return(
                                    <div className="serviceCard" key={nanoid()}>
                                        {el}
                                    </div>
                                )
                                })}
                            </div>
                            <hr />
                            <div className="citys">
                                <p>Города: </p>
                                {service.citys.map((el) => {
                                    return(
                                    <div className="cityCard" key={nanoid()}>
                                        {el}
                                    </div>
                                )
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