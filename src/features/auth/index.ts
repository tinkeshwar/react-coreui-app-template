import React from 'react'
import authLayout from './layout/auth'
const Login = React.lazy(()=> import('./form/login'))
const Logout = React.lazy(()=> import('./form/logout'))
const Forget = React.lazy(()=>import('./form/forget'))
const Reset = React.lazy(()=>import('./form/reset'))
const UserProfile = React.lazy(()=>import('./profile/profile'))
const UserSettings = React.lazy(()=>import('./profile/settings'))

export {
    Login,
    Logout,
    Forget,
    Reset,
    authLayout,

    UserProfile,
    UserSettings
}