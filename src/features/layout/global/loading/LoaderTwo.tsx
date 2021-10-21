import { CCol, CContainer, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import saga from '../../../../asset/animation/success.json'
import { LoaderProp } from '../../type'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
    padding-top: 20%;
`

const LoaderTwo = ({
    location,
    timer
}:LoaderProp) => {
    const history = useHistory()

    useEffect(()=>{
        setTimeout(()=>{
            if(location)
            history.push(location)
        },(timer || 500))
    })

    return (
        <CContainerStyled fluid className={'bg-primary'}>
            <CRow>
                <CCol md={2} className={'m-auto'}>
                    <Lottie
                        loop
                        play
                        rendererSettings={{preserveAspectRatio: 'xMidYMid slice'}}
                        animationData={saga}
                    />
                </CCol>
            </CRow>
        </CContainerStyled>
    )
}

export default LoaderTwo