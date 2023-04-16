import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";

export const ServicesPage = () => {
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "d0b5a21192e9fd28af54b1e555b7d09ae00a34c7";

  const [regions, setRegions] = useState([])
  const [choiceRegion, setChoiceRegions] = useState('')

  const [citys, setCitys] = useState([])
  const [choiceCity, setChoiceCity] = useState('')

  const [requestReg, setRequestReg] = useState([])
  const [requestCity, setRequestCity] = useState([])

  const getOptions = (request) => {
    console.log(choiceRegion.split(' ')[0])
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

  return (
    <div className="loginPage">
      <div className="regions">
        <input value={requestReg} type="text" onChange={handleChangeReg} placeholder='Регион'/>
        <div>
          {regions && regions.map((region) => {
            return(
              <p 
                key={nanoid()}
                onClick={e=>handleChoiceReg(region)}
                >{region.value}</p>
            )            
          })}
        </div>
      </div>
      
      <div className="citys">
        <input value={requestCity} type="text" onChange={handleChangeCity}/>
        <div className="citys">
          {citys && citys.map((city) => {
            return(
              <p 
                key={nanoid()}
                onClick={handleChoiceCity}
                >{city.value}</p>
            )            
          })}
        </div>
      </div>
    </div>
  );
};
