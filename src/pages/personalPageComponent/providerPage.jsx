import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase/firebase";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import { useOnClickOutSide } from "../../hooks/useOnClickOutSide";
import { CityCard, DeleteBtn, ServiceCard } from "../../styles/generalStyledComponents";
import { Finded, ItemFinded } from "../servicePageComponent/filters";
import { nanoid } from "nanoid";
import { Input, Button, CardHeader, Card } from "../../styles/StyledComponent";

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const CardInput = styled(Input)`
    box-sizing: border-box;
    margin: 0;

    &::-webkit-input-placeholder       {opacity: 1; transition: opacity 0.3s ease;}
    &::-moz-placeholder                {opacity: 1; transition: opacity 0.3s ease;}
    &:-moz-placeholder                 {opacity: 1; transition: opacity 0.3s ease;}
    &:-ms-input-placeholder            {opacity: 1; transition: opacity 0.3s ease;}
    &:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
    &:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
    &:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
    &:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}
`

const CardButton = styled(Button)`
    color: black;
`

const LabelInput = styled.label`
    color: #6c6c6c;
    margin: 10px 0 0; 
    padding: 15px;
    width: 100%;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 10px;
    box-sizing: border-box;
    outline: none;
    text-align: center;
    cursor: pointer;
`

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 50%;
    z-index: 99;
    border: 2px solid #8da4f1;
    background-color: #d9d9d9;
    border-radius: 10px;
    padding: 15px;
    color: black;
`

const ModalH1 = styled.h1`
    color: black;
`

const ModalButton = styled.button`
    width: 220px;
    height: 40px;
    background-color:#8da4f1;
    border-radius: 10px;
    color: black;
    border: none;
`

const SubmitButton = styled.button`
    box-sizing: border-box;
    max-width: 500px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #d9d9d9;
    text-transform: uppercase;
    text-align: center;
    padding: 15px;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 400;
    background-color: rgba(141, 164, 241, 1);
    &:hover {
      background-color: rgba(141, 164, 241, 1);
    }
    &:active {
      background-color: rgba(141, 164, 241, 1);
    }

    @media (max-width: 625px) {
        max-width: none;
    }
`

const Citys = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    margin: 10px 0;
`

export const ProviderPage = () => {

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "d0b5a21192e9fd28af54b1e555b7d09ae00a34c7";

    const node = useRef()
    useOnClickOutSide(node, () => setModalOpen(false))

    const { currentUser } = useContext(AuthContext)

    const [files, setFiles] = useState([])
    const [filesForView, setFilesForView] = useState([])

    const [text, setText] = useState('')

    const [citys, setCitys] = useState([])
    const [citysInput, setCitysInput] = useState('')

    const [services, setServices] = useState([])
    const [servicesInput, setServicesInput] = useState('')

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')

    const [citysFinded, SetCitysFinded] = useState([])

    const getOptions = (city) => {
        
        const body = {
            query: city, 
            "from_bound": { "value": 'city' },
            "to_bound": { "value": 'city' },
            "restrict_value": true
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

    const getCitysAPI = async (options) => {
        await fetch(url, options)
            .then(response => response.text())
            .then(result => {
                const answer = JSON.parse(result)
                SetCitysFinded(answer.suggestions)
            })
            .catch(error => console.log("error", error));
    }

    useEffect(() => {
        getData()

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        getCitysAPI(getOptions(citysInput))
    }, [citysInput])

    const getData = async () => {
        const docRef = doc(db, "providerPages", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setCitys([...docSnap.data().citys])
            setServices([...docSnap.data().services])
            setText(docSnap.data().text)
            setFilesForView(docSnap.data().photoURLs)
        } else {
            console.log("No such document!");
        }
    }

    const clearPreview = el => {
        el.style.bottom = '0px'
        el.innerHTML = '<div class="preview-info-progress"></div>'
    }

    const cardUpdate = async () => {
        document.querySelectorAll('.preview-remove').forEach(el => el.remove())
        const previewInfo = document.querySelectorAll('.preview-info')
        previewInfo.forEach(clearPreview)

        try {
            const promises = [];

            if(files.length > 0) {
                files.forEach((file, index) => {
                    const storageRef = ref(storage, `providersImages/${currentUser.uid}/${file.name}`);

                    const uploadTask = uploadBytesResumable(storageRef, file.file);
                    uploadTask.on('state_changed', (snapshot) => {
                        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                        const block = previewInfo[index].querySelector('.preview-info-progress')
                        block.style.width = percentage
                    })
                    promises.push(uploadTask);
                })
            
                const uploadResults = await Promise.all(promises);
            
                const downloadURLs = await Promise.all(
                    uploadResults.map((uploadResult) => getDownloadURL(uploadResult.ref))
                );
            
                const providerPagesRef = doc(db, "providerPages", currentUser.uid);
                
                await updateDoc(providerPagesRef, {
                    uid: currentUser.uid,
                    userPhoto: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    text,
                    citys,
                    services,
                    photoURLs: downloadURLs,
                });

                const filtersRef = doc(db, 'filters', 'vfntUgqcL0fuCBnXlysr')

                await updateDoc(filtersRef, {
                    citys: arrayUnion(...citys)
                })
                
                // filesForView.forEach((file) => {
                //     deleteObject(ref(storage, `providersImages/${currentUser.uid}/${file}`))
                // })
                
                setTimeout(deleteFiles(),5000)
            } else {
            
                const providerPagesRef = doc(db, "providerPages", currentUser.uid);
                
                await updateDoc(providerPagesRef, {
                    uid: currentUser.uid,
                    userPhoto: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    text,
                    citys,
                    services,
                });

                const filtersRef = doc(db, 'filters', 'vfntUgqcL0fuCBnXlysr')

                await updateDoc(filtersRef, {
                    citys: arrayUnion(...citys)
                })
            }
            
            getData()
            setModalContent('Ваша карточка обновлена')
            openModal()
        
        } catch (error) {
        }
    };

    const cardShow = async () => {
        const providerPagesRef = doc(db, "providerPages", currentUser.uid);
                
        await updateDoc(providerPagesRef, {
            visibility: true,
        });
        
        setModalContent('Ваша карточка опубликована')
        openModal()
    }

    const cardHidden = async () => {
        const providerPagesRef = doc(db, "providerPages", currentUser.uid);
                
        await updateDoc(providerPagesRef, {
            visibility: false,
        });

        setModalContent('Ваша карточка скрыта')
        openModal()
    }

    const deleteText = () => {
        setText('')
    }

    const handleCitys = (e) => {
        const city = e.target.innerText
        if (city.length > 0) {
            setCitys(prevState => ([...prevState, city]))
            setCitysInput('')
        } else {
            console.log('Пустая строка')
        }
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
            console.log('Пустая строка')
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
        
        if (!e.target.files.length) {
            return
        }

        const uploadFiles = Array.from(e.target.files)
        
        setFiles([])

        uploadFiles.forEach(file => {
            if(!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = (e) => {
                setFiles(prev => [...prev, {
                    file: file,
                    url: e.target.result,
                    name: file.name,
                    size: file.size,
                    type: file.type}
                ])
            }

            reader.readAsDataURL(file)
        })
    }

    const deleteFile = (e) => {
        document.querySelector('input[type=file]').value = ''
        if (!e.target.dataset.name) {
            return
        }

        const name = e.target.dataset.name
        
        const block = document
            .querySelector(`[data-name="${name}"]`)
            .closest('.preview-image')

        block.classList.add('removing')
        setTimeout(() => setFiles(files.filter(file => file.name !== name)), 300)
    }

    const deleteFiles = () => {
        const block = document.querySelectorAll('.preview-image')
        block.forEach((el) => {
            el.classList.add('removing')
        })
        document.querySelector('input[type=file]').value = ''
        setTimeout(() => setFiles([]), 300)
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = (e) => {
        setModalOpen(false)
    }

    return(
        <>
            {modalOpen && 
            <Modal>
                <ModalH1>{modalContent}</ModalH1>
                <ModalButton onClick={closeModal}>Ок</ModalButton>
            </Modal>}
            <h1 style={{textAlign: 'center'}}>Карточка поставщика услуг</h1>
            <Card>
                <CardHeader>Отображаемый текст</CardHeader>
                <p>В окне ниже введите текст, который будет
                    отображаться на карточке поставщика услуг </p>
                <ReactQuill value={text} placeholder="Введите текст" onChange={setText} style={{ margin: '10px 0 0'}}/>
                <CardButton onClick={deleteText}>Очистить</CardButton>
            </Card>
            <Card>

                <CardHeader>Отображаемые файлы</CardHeader>
                <div className="images">{filesForView && filesForView.map((file) => {
                    return(
                        
                        <img src={file} alt="" key={file}/>
                        
                    )
                })}</div>
                
                <p>Выберите фото или видео-файлы, которые будут 
                    отображаться на карточке поставщика услуг.</p>
                <p>Новые файлы заменят собой старые</p>

                <input 
                    type="file"
                    id="file"
                    onChange={handleFiles}
                    multiple="multiple"
                    style={{display: "none"}} 
                />

                <LabelInput htmlFor="file">Прикрепить файлы</LabelInput>

                <div className="preview" id="preview" onClick={deleteFile}>
                    {files && files.map((file) => {
                        return(
                            <div className="preview-image" key={file.name}>
                                <div 
                                    className="preview-remove"
                                    data-name={file.name}
                                    >&times;</div>
                                <img src={file.url} alt="" />
                                <div className="preview-info">
                                    <span>{file.name.substr(0, 10)}</span>
                                    <span>{formatBytes(file.size)}</span>
                                </div>
                            </div>
                        )
                    })}
    
                </div> 
                <CardButton
                    onClick={deleteFiles}>Очистить</CardButton>
            </Card>
            <Card>
                <CardHeader>Город</CardHeader>
                <CardInput type='text' value={citysInput} onChange={(e)=>{setCitysInput(e.target.value)}} placeholder='Поиск'/>
                <Finded>
                    {citysFinded && citysFinded.map((city) => {
                        return(
                            <ItemFinded key={nanoid()}>
                                <p
                                onClick={(e)=>handleCitys(e)}
                                >{city.value.replace(/г\ /g, '') //eslint-disable-line
                                }</p>
                               
                            </ItemFinded>
                            )            
                    })}

                </Finded>
                {citys && citys.length > 0 && 
                    <Citys>
                        <p style={{marginRight: '5px'}}>Cписок городов:</p>
                        {citys.map((el) => {
                            return(
                                <CityCard>
                                    <p>{el}</p>
                                    <DeleteBtn onClick={() => deleteCity(el)}>
                                        <img src={require('../../images/x.png')} width='10px' alt="" />
                                    </DeleteBtn>
                                </CityCard> 
                            )
                        })}
                    </Citys>}
                <CardButton onClick={deleteCitys}>
                    Очистить
                </CardButton>
            </Card>

            <Card>
                <CardHeader>Предоставляемые услуги</CardHeader>
                <CardInput 
                    style={{marginBottom: '10px'}}
                    type="text" 
                    placeholder="Введите название услуги" 
                    id="services" 
                    value={servicesInput} 
                    onKeyDown={handleKeyServices}
                    onChange={(e) => {setServicesInput(e.target.value)}}
                    autoComplete="off"/>
                {services && services.length > 0 && 
                    <Citys>
                        <p style={{marginRight: '5px'}}>Cписок услуг:</p>
                        {services.map((el) => {
                            return(
                                <ServiceCard>
                                    <p>{el}</p>
                                    <DeleteBtn onClick={e => deleteService(el)}>
                                        <img src={require('../../images/x.png')} width='10px' alt="" />
                                    </DeleteBtn>
                                </ServiceCard> 
                            )
                        })}
                    </Citys>}
                <CardButton onClick={deleteServices}>Очистить</CardButton>
            </Card>
            {/* <div className="fnlBtn" onClick={handlePreview}>Предпросмотр</div> */}
            <SubmitButton onClick={cardUpdate}>Обновить</SubmitButton>
            <SubmitButton onClick={cardShow}>Опубликовать</SubmitButton>
            <SubmitButton onClick={cardHidden}>Скрыть публикацию</SubmitButton>
        </>
    )
}