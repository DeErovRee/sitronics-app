import React, { useContext, useEffect, useState } from "react";
import DOMPurify from 'dompurify'
import { nanoid } from "nanoid";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from '../context/AuthContext'
import styled from 'styled-components'

const Reviews = styled.div`
    margin: 0 0 50px;
`

const Review = styled.div`
    background-color: #1e1e1e;
    border-radius: 20px;
    color: white;
    padding: 10px;
    margin: 0 0 10px 0;
`

const Input = styled.input`
    display: none;
`

export const ServicePage = () => {

    const [reviews, setReviews] = useState('')

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
            <div dangerouslySetInnerHTML={{ __html: sanitizedText }} className='text'></div>
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

        console.log(reviews)
        
        return() => {
            unsub()
        }

        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="providerServicePage">
            <div className="providerMainInfo">
                <div className="containerImg" >
                    <img className='providerImg' src={provider.userPhoto} alt="" />
                </div>
                <h2>{provider.displayName}</h2>
            </div>
            <div className="providerInfo">
                <div className="left">
                    <div className="providerPhoto">
                        {provider.photoURLs && provider.photoURLs.map((img) => {
                            return(
                                <img src={img} alt="" key={img} width='100px'/>
                            )
                        })}
                    </div>
                    <form id="serviceForm" className="serviceForm" onSubmit={handleSubmit}>
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
                    </form>
                </div>
                <div className="right" id="providerTextInfo">
                    <TextPage text={provider.text} />
                    <div className="citys">
                        <p>Города:</p>
                        <div>
                        {provider.citys && provider.citys.map((el) => {
                            return(
                                <div className="cityCard">
                                    {el}
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className="services">
                        <p>Услуги:</p>
                        <div>
                        {provider.services && provider.services.map((el) => {
                            return(
                                <div className="serviceCard">
                                    {el}
                                </div>
                            )
                        })}
                        </div>
                    </div>

                </div>
            </div>
            <Reviews>
                {[...reviews].map((review) => {
                    return(
                        <Review>
                            <p>{review.date}</p>
                            {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1
                                    return(
                                            <label key={nanoid()}>
                                                <Input 
                                                    type='radio'
                                                    name='rating'
                                                    value={ratingValue}
                                                />
                                                <svg 
                                                    width="35px" 
                                                    height="35px" 
                                                    viewBox="0 0 24 24" 
                                                    // stroke={ratingValue > (hover || rating) ? 'grey' : 'black'} 
                                                    fill={ratingValue > (review.rating) ? '#d4d4d4' : 'gold'}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    {/* <path d="M12.5095 17.7915C12.1888 17.6289 11.8112 17.6289 11.4905 17.7915L7.37943 19.8751C6.50876 20.3164 5.52842 19.5193 5.76452 18.562L6.72576 14.6645C6.81767 14.2918 6.72079 13.8972 6.46729 13.6117L3.29416 10.0378C2.66165 9.32543 3.11095 8.18715 4.05367 8.11364L8.48026 7.76848C8.89433 7.73619 9.25828 7.47809 9.43013 7.09485L10.9627 3.67703C11.3675 2.77432 12.6325 2.77432 13.0373 3.67703L14.5699 7.09485C14.7417 7.47809 15.1057 7.73619 15.5197 7.76848L19.9463 8.11364C20.889 8.18715 21.3384 9.32543 20.7058 10.0378L17.5327 13.6117C17.2792 13.8972 17.1823 14.2918 17.2742 14.6645L18.2355 18.562C18.4716 19.5193 17.4912 20.3164 16.6206 19.8751L12.5095 17.7915Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> */}
                                                    
                                                    <path d="M20,7H18V5h2a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2h2V7H8V5h2a1,1,0,0,0,0-2H4A1,1,0,0,0,4,5H6V7H4a3,3,0,0,0,0,6H6.1a4.955,4.955,0,0,0,.99,2.092A5,5,0,0,0,3,20a1,1,0,0,0,2,0,3,3,0,0,1,3-3h3v2a1,1,0,0,0,2,0V17h3a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5,5,0,0,0-4.091-4.908A4.955,4.955,0,0,0,17.9,13H20a3,3,0,0,0,0-6Zm0,4H17a1,1,0,0,0-1,1,3,3,0,0,1-3,3H11a3,3,0,0,1-3-3,1,1,0,0,0-1-1H4A1,1,0,0,1,4,9H20a1,1,0,0,1,0,2Zm-6,1a2,2,0,0,1-4,0,1.929,1.929,0,0,1,.1-.581A1,1,0,1,0,11.417,10.1,1.978,1.978,0,0,1,12,10,2,2,0,0,1,14,12Z"/>
            
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="UAV"><path d="M38.364,41.192l7.071,7.072a2,2,0,1,0,2.829-2.829l-7.072-7.071a9.01,9.01,0,0,1,0-12.728l7.072-7.071a2,2,0,1,0-2.829-2.829l-7.071,7.072a9.012,9.012,0,0,1-12.728,0l-7.071-7.072a2,2,0,0,0-2.829,2.829l7.072,7.071a9.01,9.01,0,0,1,0,12.728l-7.072,7.071a2,2,0,1,0,2.829,2.829l7.071-7.072A9.012,9.012,0,0,1,38.364,41.192ZM29,32a3,3,0,1,1,3,3A3,3,0,0,1,29,32Z"/><circle cx="32" cy="32" r="1"/><path d="M14,24a10.094,10.094,0,0,0,3.651-.692l-3.329-3.329a4,4,0,0,1,5.657-5.657l3.329,3.329A10,10,0,1,0,14,24Zm1-12a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5,1,1,0,0,1,0,2Zm0-6a1,1,0,0,1,0,2,7.008,7.008,0,0,0-7,7,1,1,0,0,1-2,0A9.011,9.011,0,0,1,15,6Z"/><path d="M23.311,46.346l-3.332,3.332a4,4,0,0,1-5.657-5.657L17.648,40.7A10,10,0,1,0,24,50,9.9,9.9,0,0,0,23.311,46.346ZM15,58a9.011,9.011,0,0,1-9-9,1,1,0,0,1,2,0,7.008,7.008,0,0,0,7,7,1,1,0,0,1,0,2Zm0-4a5.006,5.006,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3,1,1,0,0,1,0,2Z"/><path d="M40.7,17.648l3.326-3.326a4,4,0,0,1,5.657,5.657l-3.332,3.332A9.9,9.9,0,0,0,50,24a10.018,10.018,0,1,0-9.3-6.352ZM49,6a9.011,9.011,0,0,1,9,9,1,1,0,0,1-2,0,7.008,7.008,0,0,0-7-7,1,1,0,0,1,0-2Zm0,4a5.006,5.006,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3,1,1,0,0,1,0-2Z"/><path d="M50,40a9.815,9.815,0,0,0-3.651.692l3.329,3.329a4,4,0,0,1-5.657,5.657l-3.329-3.329A9.819,9.819,0,0,0,40,50,10,10,0,1,0,50,40ZM49,52a3,3,0,0,0,3-3,1,1,0,0,1,2,0,5.006,5.006,0,0,1-5,5,1,1,0,0,1,0-2Zm0,6a1,1,0,0,1,0-2,7.008,7.008,0,0,0,7-7,1,1,0,0,1,2,0A9.011,9.011,0,0,1,49,58Z"/></g></svg> */}
                                                </svg>
                                            </label>
                                    )
                                })}
                            <p>{review.reviews}</p>
                        </Review>
                    )
                })}
                {console.log(reviews)}
            </Reviews>
        </div>
    )
}