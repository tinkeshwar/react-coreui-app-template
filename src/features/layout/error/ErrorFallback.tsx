import React from 'react'
import { LoaderSix } from '..'

export const ErrorFallback = ({error, resetErrorBoundary}:{
    error: any,
    resetErrorBoundary: any
}) => {
    return (
        <LoaderSix message={error.message}/>
    )
}