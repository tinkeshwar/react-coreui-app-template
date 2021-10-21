import React, { Suspense } from 'react'
import { Logout } from '../features/auth'
import { LoaderTwo } from '../features/layout'

const LogoutPage = () => {
    return <Suspense fallback={<LoaderTwo/>}><Logout/></Suspense>
}

export default LogoutPage