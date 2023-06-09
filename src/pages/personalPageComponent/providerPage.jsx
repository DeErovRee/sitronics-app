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
// import Modal from 'react-modal'

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

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

export const ProviderPage = () => {

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

    const [error, setError] = useState('')

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')

    useEffect(() => {
        getData()

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                console.log(citys)
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

                console.log(citys)
                await updateDoc(filtersRef, {
                    citys: arrayUnion(...citys)
                })
            }
            
            getData()
            setModalContent('Ваша карточка обновлена')
            openModal()
        
        } catch (error) {
          setError(error);
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
        <div className="providerPage" >
            {modalOpen && 
            <Modal>
                <ModalH1>{modalContent}</ModalH1>
                <ModalButton onClick={closeModal}>Ок</ModalButton>
            </Modal>}
            <h1>Карточка поставщика услуг</h1>
            <div className="card">
                <p className="cardHeader">Отображаемый текст</p>
                <p>В окне ниже введите текст, который будет
                    отображаться на карточке поставщика услуг </p>
                <ReactQuill value={text} placeholder="Введите текст" onChange={setText} />
                <div  className="cardBtn">
                    <div className="settingsBtn" onClick={deleteText}>Очистить</div>
                </div>
            </div>
            <div className="card">

                <p className="cardHeader">Отображаемые файлы</p>
                <div className="images">{filesForView && filesForView.map((file) => {
                    return(
                        
                        <img src={file} alt="" key={file}/>
                        
                    )
                })}</div>
                
                <p>Выберите фото или видео-файлы, которые будут 
                    отображаться на карточке поставщика услуг. Новые файлы заменят собой старые</p>

                <input 
                    type="file"
                    id="file"
                    onChange={handleFiles}
                    multiple="multiple"
                    style={{display: "none"}} 
                />

                <label htmlFor="file">Прикрепить файлы</label>

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

                <div  className="cardBtn">

                    <div 
                        className="settingsBtn"
                        onClick={deleteFiles}
                    >Очистить</div>

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
                {citys && citys.length > 0 && 
                    <div className="citys">
                        <p style={{marginRight: '5px'}}>Cписок городов:</p>
                        {citys.map((el) => {
                            return(
                                <CityCard>
                                    <p>{el}</p>
                                    <DeleteBtn onClick={e => deleteCity(el)}>
                                        <img src={require('../../images/x.png')} width='10px' alt="" />
                                    </DeleteBtn>
                                </CityCard> 
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
                {services && services.length > 0 && 
                    <div className="citys">
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
                    </div>}
                <div className="cardBtn">
                    <div className="settingsBtn" onClick={deleteServices}>Очистить</div>
                </div>
            </div>
            {/* <div className="fnlBtn" onClick={handlePreview}>Предпросмотр</div> */}
            <div className="fnlBtn submitBtn" onClick={cardUpdate}>Обновить</div>
            <div className="fnlBtn submitBtn" onClick={cardShow}>Опубликовать</div>
            <div className="fnlBtn submitBtn" onClick={cardHidden}>Скрыть публикацию</div>
        </div>
    )
}