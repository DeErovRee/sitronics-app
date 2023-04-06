import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase/firebase";

export const ProviderPage = () => {

    const { currentUser } = useContext(AuthContext)

    const [files, setFiles] = useState([])
    const [filesForView, setFilesForView] = useState([])

    const [text, setText] = useState('')

    const [citys, setCitys] = useState([])
    const [citysInput, setCitysInput] = useState('')

    const [services, setServices] = useState([])
    const [servicesInput, setServicesInput] = useState('')

    const [error, setError] = useState('')

    const handlePreview = () => {
        console.log(files)
        console.log(filesForView)
        console.log(text)
        console.log(citys)
        console.log(services)
    }

    const handleData = async () => {
        const docRef = doc(db, "providerPages", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setCitys(docSnap.data().citys)
            setServices(docSnap.data().services)
            setText(docSnap.data().text)
            setFiles(docSnap.data().photoURLs)
            setFilesForView(docSnap.data().photoURLs)
        } else {
        
        console.log("No such document!");
        }
    }

    const handleSubmit = async () => {
        try {
          const promises = [];
      
          for (const file of files) {
            const date = new Date().getTime();
            const storageRef = ref(storage, `${file.name}_${date}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask);
          }
      
          const uploadResults = await Promise.all(promises);
      
          const downloadURLs = await Promise.all(
            uploadResults.map((uploadResult) => getDownloadURL(uploadResult.ref))
          );
      
          const providerPagesRef = doc(db, "providerPages", currentUser.uid);
          
            await setDoc(providerPagesRef, {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              text,
              citys,
              services,
              photoURLs: downloadURLs,
            });
        
        } catch (error) {
          setError(error);
        }
      };

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
        
        for (let i = 0; i < e.target.files.length; i++) {
            setFiles(prevState => ([...prevState, e.target.files[i]]))
            setFilesForView(prevState => ([...prevState, 
                {URL: URL.createObjectURL(e.target.files[i]),
                type: e.target.files[i].type.slice(0,e.target.files[i].type.lastIndexOf('/')),
                name: e.target.files[i].name,
                size: e.target.files[i].size}
            ]))
        }
    }

    const deleteFile = (file) => {
        
        URL.revokeObjectURL(file.URL); // удаляем объект URL, связанный с файлом
        if (files.length === 1) {
            console.log('все удалено')
            setFiles([])
            setFilesForView([])
        } else {
            setFiles(files.filter((el) => {
                return el.name !== file.name
            }))
            setFilesForView(filesForView.filter((el) => {
                return el.name !== file.name
            }))
        }
    }

    const deleteFiles = () => {
        
        for (let file of filesForView) {
            URL.revokeObjectURL(file.URL)
        }
        setFiles([])
        setFilesForView([])
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
                    {files && filesForView.map((el) => {
                        if (el.type === 'video') {
                            return (<div className="soloImg" key={nanoid()}>
                                <video src={el.URL+'#t=0.5'} preload='metadata' poster={el.URL}>
                                    <source type={el.type}/>
                                </video>
                                <button className='deleteCity' onClick={e => deleteFile(el)} >
                                    <img src={require('../../images/x.png')} alt=''/>
                                </button>
                                {URL.revokeObjectURL(el.URL)}
                            </div> )
                        } else {
                            return(
                                <div className="soloImg" key={nanoid()}>
                                    <img src={el.URL} alt=''/>
                                    <button className='deleteCity' onClick={e => deleteFile(el)} >
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
            <div className="fnlBtn" onClick={handlePreview}>Предпросмотр</div>
            <div className="fnlBtn submitBtn" onClick={handleSubmit}>Опубликовать</div>
            <div className="fnlBtn submitBtn" onClick={handleData}>Получить данные</div>
        </div>
    )
}