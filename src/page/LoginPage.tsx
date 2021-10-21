import React, { Suspense } from 'react'
import { Login } from '../features/auth'
import { LoaderTwo } from '../features/layout'

const LoginPage = ()=>{
  return (
    <Suspense fallback={<LoaderTwo/>}><Login/></Suspense>
  )
}

export default LoginPage