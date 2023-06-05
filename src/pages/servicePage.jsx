import React, { useContext } from "react";
import DOMPurify from 'dompurify'
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from '../context/AuthContext'

export const ServicePage = () => {

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
        </div>
    )
}