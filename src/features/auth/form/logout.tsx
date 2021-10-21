import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import Lottie from 'react-lottie-player'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { logOut } from '../store'
import saga from '../../../asset/animation/success.json'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
    padding-top: 20%;
`

const Logout = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(logOut())
        setTimeout(()=>{
            history.push('/')
        },1500)
        return() => { clearTimeout() }
    },[dispatch, history])
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

export default Logout