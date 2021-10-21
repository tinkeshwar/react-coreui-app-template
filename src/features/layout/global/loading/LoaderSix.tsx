import { CCol, CContainer, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import bug from '../../../../asset/animation/bug.json'
import { LoaderProp } from '../../type'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
`

const LoaderSix = ({
    location,
    timer,
    message
}:LoaderProp) => {

    const history = useHistory()

    const goToHome = () => {
        history.push('/')
    }

    useEffect(()=>{
        if(timer){
            setTimeout(()=>{
                if(location)
                    history.push(location)
            },(timer || 500))
        }
    },[history, location, timer])

    return (
        <CContainerStyled fluid onClick={goToHome} className={'bg-white'}>
            <CRow>
                <CCol md={6} className={'m-auto'}>
                    <Lottie
                        loop
                        play
                        rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                        animationData={bug}
                        style={{width: '100%', height:'100vh'}}
                    />
                </CCol>
            </CRow>
        </CContainerStyled>
    )
}

export default LoaderSix