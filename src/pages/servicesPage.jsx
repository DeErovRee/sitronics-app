import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { Link } from "react-router-dom";

export const ServicesPage = () => {

  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "d0b5a21192e9fd28af54b1e555b7d09ae00a34c7";

  const [regions, setRegions] = useState([])
  const [choiceRegion, setChoiceRegions] = useState('')

  const [citys, setCitys] = useState([])
  const [choiceCity, setChoiceCity] = useState('')

  const [requestReg, setRequestReg] = useState([])
  const [requestCity, setRequestCity] = useState([])

  const [servicesList, setServicesList] = useState([])

  const getOptions = (request) => {
    let body
    if(request === requestCity) {
      body = {
        query: request, 
        "from_bound": { "value": 'city' },
        "to_bound": { "value": 'city' },
        "locations": [
          {
            "region_fias_id": choiceRegion
          }
        ],
        "restrict_value": true
      }
    } else if(request === requestReg) {
      body = {
        query: request, 
        "from_bound": { "value": 'region' },
        "to_bound": { "value": 'region' },
      }
    }

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
      },
      body: JSON.stringify(body)
    }

    return options
  }

  const getData = async (options, param) => {
    await fetch(url, options)
      .then(response => response.text())
      .then(result => {
        const answer = JSON.parse(result)
        if (param === requestReg) {
          setRegions(answer.suggestions)
        } else if (param === requestCity) {
          setCitys(answer.suggestions)
        }
      })
      .catch(error => console.log("error", error));
  }

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
  },[requestReg])

  useEffect(() => {
    getData(getOptions(requestCity, choiceCity), requestCity)
  },[requestCity])

  useEffect(() => {
    getServices()
  }, [])

  return (
    <div className="servicePage">
      <h2>услуги</h2>
      <div className="sorts">
        <p>Сортировать по:</p>
        <div>Популярности</div>
        <div>Рейтингу</div>
        <div>Цене</div>
      </div>
      <div className="servicesRender">
        <div className="filters">
          <div className="filter">
            <p>Услуги</p>
            <input className="input-text" type="text" placeholder='Поиск'/>
            <div className="items-finded"></div>
          </div>
          
          <div className="filter">
            <p>Область / Регион</p>
            <input className="input-text" value={requestReg} type="text" onChange={handleChangeReg} placeholder='Поиск'/>
            <div className="items-finded">
              {regions && regions.map((region) => {
                return(
                  <div className="item" key={nanoid()}>
                    <input type='checkbox' className="checkbox"/>
                    <p
                      onClick={e=>handleChoiceReg(region)}
                      >{region.value}
                    </p>
                  </div>
                )            
              })}
            </div>
          </div>
          
          <div className="filter">
            <p>Населенный пункт</p>
            <input className="input-text" value={requestCity} type="text" onChange={handleChangeCity} placeholder='Поиск'/>
            <div className="items-finded">
              {citys && citys.map((city) => {
                return(
                  <div className="item" key={nanoid()}>
                    <input type='checkbox' className="checkbox" />
                    <p
                      onClick={handleChoiceCity}
                      >{city.value}</p>
                  </div>
                )            
              })}
            </div>
          </div>
        </div>
        <div className="servicesSpace">
            {servicesList && servicesList.map((service) => {
              return(
              <Link to={{
                pathname: service.uid
              }} key={nanoid()}>
                <div className="serviceCard" >
                  <div className="container" >
                    <img className='providerImg' src={`${service.userPhoto}`} alt="" />
                  </div>
                  <div className="serviceCard-info">
                    <h5>{service.displayName}</h5>
                    <div className="rateDron">
                      <img className='rateImg' src={require('../images/rate-dron-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-dron-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-dron-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-dron-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-dron-disable.png')} alt="" width='12px'/>
                    </div>
                    <div className="rateRub">
                      <img className='rateImg' src={require('../images/rate-ruble-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-ruble-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-ruble-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-ruble-enable.png')} alt="" width='12px'/>
                      <img className='rateImg' src={require('../images/rate-ruble-disable.png')} alt="" width='12px'/>
                    </div>
                    <div className="services">
                      <p>Услуги: </p>
                      {service.services.map((el) => {
                      return(
                        <div className="serviceCard">
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
                          <div className="cityCard">
                            {el}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Link>
              )
          })}
        </div>
      </div>
    </div>
  );
};
