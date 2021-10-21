import React, {Suspense} from 'react'
import { Forget } from '../features/auth'
import { LoaderTwo } from '../features/layout'

const PasswordForgetPage = () => {
    return (
        <Suspense fallback={<LoaderTwo/>}><Forget/></Suspense>
    )
}

export default PasswordForgetPage