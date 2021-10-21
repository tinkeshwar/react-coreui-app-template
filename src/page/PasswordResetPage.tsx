import React, {Suspense} from 'react'
import { Reset } from '../features/auth'
import { LoaderTwo } from '../features/layout'

const PasswordResetPage = () => {
    return (
        <Suspense fallback={<LoaderTwo/>}><Reset/></Suspense>
    )
}

export default PasswordResetPage