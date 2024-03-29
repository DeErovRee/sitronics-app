import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ authenticated, ...rest }) => {
    return authenticated ? <React.Fragment {...rest} /> : <Navigate to={{ pathname: '/login' }} />
}
