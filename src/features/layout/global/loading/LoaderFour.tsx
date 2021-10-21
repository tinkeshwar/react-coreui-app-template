import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import vidhya from '../../../../asset/animation/unknown.json'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
    padding-top: 20%;
`

const LoaderFour = () => {

    return (
        <CContainerStyled fluid className={'bg-primary'}>
            <CRow>
                <CCol md={3} className={'text-center m-auto'}>
                    <Lottie
                        loop
                        play
                        rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                        animationData={vidhya}
                    />
                </CCol>
            </CRow>
        </CContainerStyled>
    )
}

export default LoaderFour