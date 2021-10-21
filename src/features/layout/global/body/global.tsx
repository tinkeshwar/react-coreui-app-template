import { CContainer } from '@coreui/react'
import React, { useContext, useEffect } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { GlobalFooter, GlobalSidebar, GlobalHeader } from '../..'
import { authLayout } from '../../../auth'
import { Div, Main } from '../../styled'
import { GlobalLayoutProp } from '../../type'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../error/ErrorFallback'
import { useDispatch } from 'react-redux'
import UserContext from '../../../../app/context'
import { getUserProfile } from '../../store'

const GlobalLayoutScreen = ({children}: GlobalLayoutProp) => {

    const dispatch = useDispatch()
    const profile = useContext(UserContext)

    useEffect(()=>{
        dispatch(getUserProfile(profile))
    },[dispatch,profile])

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
        >
            <Div className={'c-app c-default-layout'}>
                <GlobalSidebar/>
                <Div className={'c-wrapper'}>
                    <GlobalHeader/>
                    <Div className={'c-body'}>
                        <Main className={'c-main'}>
                            <CContainer fluid>
                                {children}
                            </CContainer>
                        </Main>
                    </Div>
                    <GlobalFooter/>
                </Div>
                <ToastContainer autoClose={5000} transition={Slide}/>
            </Div>
        </ErrorBoundary>
    )
}

const GlobalLayout = authLayout(GlobalLayoutScreen)

export default GlobalLayout