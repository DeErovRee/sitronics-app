import { createContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            onSnapshot(doc(db, 'users', user.uid), (doc) => {
                doc.exists() &&
                    setCurrentUser({
                        ...user,
                        isProvider: doc.data().isProvider,
                    })
            })
        })

        return () => {
            unsub()
        }
    }, [])

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}
