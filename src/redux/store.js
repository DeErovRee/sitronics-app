import { combineReducers, getDefaultMiddleware, configureStore } from "@reduxjs/toolkit"

import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import { chatReducer } from "./chats/reducer"
import { messagesReducer } from "./messages/reducer"
import { profileReducer } from "./profile/reducer"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    stateReconciler: hardSet
}

const rootReducer = combineReducers({
    chats: chatReducer,
    profile: profileReducer,
    messages: messagesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,]
            }
        })
})