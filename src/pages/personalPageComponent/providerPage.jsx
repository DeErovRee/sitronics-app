import React from "react";
import { useState } from "react";

export const ProviderPage = () => {

    const [files, setFiles] = useState([])

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

    const handleKeyCitys = (e) => {
        e.code === "Enter" && handleCitys()
    }

    const deleteCity = (city) => {
        if (citys.length === 1) {
            setCitys([])
        } else {
            setCitys(citys.filter((el) => {
                return el !== city
            }))
        }
    }

    const deleteCitys = () => {
        setCitys([])
    }

    const handleServices = () => {
        const service = document.querySelector('#services').value
        if (service.length > 0) {
            setServices(prevState => ([...prevState, service]))
            setServicesInput('')
        } else {
            setError('Пустая строка')
        }
    }

    const handleKeyServices = (e) => {
        e.code === "Enter" && handleServices()
    }

    const deleteService = (service) => {
        if (services.length === 1) {
            setServices([])
        } else {
            setServices(services.filter((el) => {
                return el !== service
            }))
        }
    }

    const deleteServices = () => {
        setServices([])
    }

    const handleFiles = (e) => {
        let files = [...e.target.files]
        for (let i = 0; i < files.length; i++) {
            setFiles(prevState => ([...prevState, 
                {URL: URL.createObjectURL(files[i]),
                type: files[i].type.slice(0,files[i].type.lastIndexOf('/'))}
            ]))
        }
        console.log(files)
    }

    const deleteFile = (file) => {
        if (files.length === 1) {
            setFiles([])
        } else {
            setFiles(files.filter((el) => {
                return el !== file
            }))
        }
        
    }

    const deleteFiles = () => {
        setFiles([])
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
                    multiple="multiple"
                    style={{display: "none"}} 
                    id="file"
                    onChange={handleFiles}
                    autoComplete="off"/>
                <label htmlFor="file">Прикрепить файлы</label>
                <div className="pinImgs" id="pinImgs">
                    {files && files.map((el) => {
                        console.log(el)
                        if (el.type === 'video') {
                            return (<div className="soloImg" key={el.URL}>
                                <video src={el.URL+'#t=0.5'} preload='metadata' poster={el.URL}>
                                    <source type={el.type}/>
                                </video>
                                <button className='deleteCity' onClick={e => deleteFile(el)}>
                                    <img src={require('../../images/x.png')} alt=''/>
                                </button>
                            </div>)
                        } else {
                            return(
                                <div className="soloImg" key={el.URL}>
                                    <img src={el.URL} alt=''/>
                                    <button className='deleteCity' onClick={e => deleteFile(el)}>
                                        <img src={require('../../images/x.png')} alt=''/>
                                    </button>
                                </div>
                            )
                        }
                        
                    })}
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
                        onKeyDown={handleKeyCitys} 
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
                                    <button className="deleteCity" onClick={e => deleteCity(el)}>
                                        <img src={require('../../images/x.png')} width='10px' alt="" />
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
                        onKeyDown={handleKeyServices}
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
                                    <button className="deleteCity" onClick={e => deleteService(el)}>
                                        <img src={require('../../images/x.png')} width='10px' alt="" />
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