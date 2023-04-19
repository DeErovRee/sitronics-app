import React from "react";

export const ServicePage = () => {
    
    const url = document.location.pathname.split('/')[2]
    const provider = JSON.parse(localStorage.getItem(`${url}`))
    console.log(provider)

    return(
        <div className="providerServicePage">
            <div className="providerMainInfo">
                <div className="container" >
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
                <div className="providerTextInfo">
                    <p>{provider.text}</p>
                    <div className="citys">
                        <p>Города:</p>
                        {provider.citys && provider.citys.map((el) => {
                            return(
                                <div className="cityCard">
                                    {el}
                                </div>
                            )
                        })}
                    </div>
                    <div className="services">
                        <p>Услуги:</p>
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
    )
}