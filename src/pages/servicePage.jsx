import React from "react";
import DOMPurify from 'dompurify'

export const ServicePage = () => {
    
    const url = document.location.pathname.split('/')[2]
    const provider = JSON.parse(localStorage.getItem(`${url}`))

    const TextPage = ({text}) => {
        console.log(text)
        const sanitizedText = DOMPurify.sanitize(text); // очистка текста от потенциально опасных элементов
    
        return (
            <div dangerouslySetInnerHTML={{ __html: sanitizedText }} className='text'></div>
        );
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
                <div className="providerPhoto">
                    {provider.photoURLs && provider.photoURLs.map((img) => {
                        return(
                            <img src={img} alt="" key={img} width='100px'/>
                        )
                    })}
                </div>
                <div className="providerTextInfo" id="providerTextInfo">
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