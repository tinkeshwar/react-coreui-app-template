import { CCol, CContainer, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import error404 from '../../../../asset/animation/404.json'
import { LoaderProp } from '../../type'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
`

const LoaderThree = ({
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
        <CContainerStyled fluid onClick={goToHome}>
            <CRow>
                <CCol className={'m-auto'}>
                    <Lottie
                        loop
                        play
                        rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                        animationData={error404}
                        style={{width: '105%', height:'100vh'}}
                    />
                </CCol>
            </CRow>
        </CContainerStyled>
    )
}

export default LoaderThree