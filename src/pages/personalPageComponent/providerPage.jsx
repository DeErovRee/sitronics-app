import React from "react";
import { useState } from "react";

export const ProviderPage = () => {

    const [files, setFiles] = useState(null)

    const [text, setText] = useState('Это тестовый набор текста для проверки отображения длинного текста в поле ввода текста, а еще это поле можно растягивать вниз.')

    const [citys, setCitys] = useState(['Тюмень', 'Омск'])
    const [citysInput, setCitysInput] = useState('')

    const [services, setServices] = useState(['Аэросъемка', 'Ультразвуковое обследование', 'Орошение полей'])
    const [servicesInput, setServicesInput] = useState('')

    const [error, setError] = useState('')

    const handleSumbit = () => {
        console.log(files)
        console.log(text)
        console.log(citys)
        console.log(services)
        // setCitys([])
        // setServices([])
    }

    const deleteText = () => {
        setText('')
    }

    const handleCitys = () => {
        const city = document.querySelector('#citys').value
        if (city.length > 0) {
            setCitys(prevState => ([...prevState, city]))
            setCitysInput('')
        } else {
            setError('Пустая строка')
            console.log(error)
        }
    }

    const deleteCity = (city) => {
        setCitys(citys.filter((el) => {
            return el !== city
        }))
    }

    const deleteCitys = () => {
        setCitys([])
    }

    const handleServices = () => {
        const service = document.querySelector('#services').value
        if (services.length > 0) {
            setServices(prevState => ([...prevState, service]))
            setServicesInput('')
        } else {
            setError('Пустая строка')
        }
        
    }

    const deleteService = (service) => {
        setServices(services.filter((el) => {
            return el !== service
        }))
    }

    const deleteServices = () => {
        setServices([])
    }

    const handleFiles = (e) => {
        // setFiles(e.target.files)
        console.log(e.target.files)
    }

    const deleteFiles = () => {
        
    }

    return(
        <div className="providerPage">
            <h1>Карточка поставщика услуг</h1>
            <div className="card">
                <p className="cardHeader">Отображаемый текст</p>
                <p>В окне ниже введите текст, который будет
                    отображаться на карточке поставщика услуг </p>  
                <textarea placeholder="Введите текст" onChange={e => setText(e.target.value)} value={text}/>
                <div  className="cardBtn">
                    <div className="settingsBtn" onClick={deleteText}>Очистить</div>
                </div>
            </div>
            <div className="card">
                <p className="cardHeader">Отображаемые файлы</p>
                <p>Выберите фото или видео-файлы, которые будут 
                    отображаться на карточке поставщика услуг</p>
                <input 
                    type="file" 
                    style={{display: "none"}} 
                    id="file" 
                    onChange={e => handleFiles(e)}
                    autoComplete="off"/>
                <label htmlFor="file">Прикрепить файлы</label>
                <div className="pinImg">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
                <div  className="cardBtn">
                    <div className="settingsBtn" onClick={deleteFiles}>Очистить</div>
                </div>
            </div>
            <div className="card">
                <p className="cardHeader">Обслуживаемые регионы и города</p>
                <div className="inputArea" >
                    <input 
                        type="text" 
                        placeholder="Введите город или регион" 
                        id="citys" 
                        value={citysInput} 
                        onChange={(e)=>{setCitysInput(e.target.value)}}
                        autoComplete="off"/>
                    <div className="addBtn" onClick={handleCitys}>
                        <img src={require("../../images/plus.png")} width="20px" alt="plus" />
                    </div>
                </div>
                {citys.length > 0 && 
                    <div className="citys">
                        <p>Cписок городов:</p>
                        {citys.map((el) => {
                            return(
                                <div className="city" key={el}>
                                    <p>{el}</p>
                                    <button className="deleteCity">
                                        <img src={require('../../images/x.png')} width='10px' alt="" onClick={e => deleteCity(el)}/>
                                    </button>
                                </div> 
                            )
                        })}
                    </div>}
                <div className="cardBtn">
                    <div className="settingsBtn" onClick={deleteCitys}>Очистить</div>
                </div>
            </div>
            <div className="card">
                <p className="cardHeader">Предоставляемые услуги</p>
                <div className="inputArea">
                    <input 
                        type="text" 
                        placeholder="Введите название услуги" 
                        id="services" 
                        value={servicesInput} 
                        onChange={(e) => {setServicesInput(e.target.value)}}
                        autoComplete="off"/>
                    <div className="addBtn" onClick={handleServices}>
                        <img src={require("../../images/plus.png")} width="20px" alt="plus" />
                    </div>
                </div>
                {services.length > 0 && 
                    <div className="citys">
                        <p>Cписок услуг:</p>
                        {services.map((el) => {
                            return(
                                <div className="city" key={el}>
                                    <p>{el}</p>
                                    <button className="deleteCity">
                                        <img src={require('../../images/x.png')} width='10px' alt="" onClick={e => deleteService(el)}/>
                                    </button>
                                </div> 
                            )
                        })}
                    </div>}
                <div className="cardBtn">
                    <div className="settingsBtn" onClick={deleteServices}>Очистить</div>
                </div>
            </div>
            <div className="fnlBtn" onClick={handleSumbit}>Предпросмотр</div>
            <div className="fnlBtn submitBtn">Опубликовать</div>
        </div>
    )
}