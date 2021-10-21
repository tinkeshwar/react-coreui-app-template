import { CCol, CContainer, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import error500 from '../../../../asset/animation/500.json'
import { LoaderProp } from '../../type'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
`

const LoaderFive = ({
    location,
    timer
}:LoaderProp) => {

    const history = useHistory()

    const goToHome = () => {
        history.push('/')
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(location)
                history.push(location)
        },(timer || 500))
    })

    return (
        <CContainerStyled fluid onClick={goToHome} className={'bg-primary'}>
            <CRow>
                <CCol md={6} className={'m-auto'}>
                    <Lottie
                        loop
                        play
                        rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                        animationData={error500}
                        style={{width: '100%', height:'100vh'}}
                    />
                </CCol>
            </CRow>
        </CContainerStyled>
    )
}

export default LoaderFive