import React, { useEffect, useState } from 'react'
import {
    CContainer,
    CRow, CCol,
    CCardGroup,
    CCard, CCardBody,
    CForm, CInputGroup, CAlert,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { Div, Heading1, Para } from '../styled'
import { TextInput } from '../../../asset'
import { Button } from '../../../asset/buttons'
import { isEmail } from '../../../helper'
import { loadRefresh, selectIsLoggedIn, selectLoading, setLoading } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { passwordForget } from '../api'
import { Slide, ToastContainer } from 'react-toastify'
import { Logo } from '../../layout'

const Forget = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn)
    useEffect(()=>{
        if(!isLoggedIn) {
            dispatch(loadRefresh())
        }
    },[dispatch, isLoggedIn])

    if(isLoggedIn) history.push('/dashboard')

    const loading: boolean = useSelector(selectLoading)

    const [email, setEmail] = useState<string>('')
    const [usernameError, setUsernameError] = useState<string>('')
    const [success, setSuccess] =useState<boolean>(false)

    const validated = !email

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        if(!isEmail(email)){
            setUsernameError('Please Enter valid Email Address')
            return false
        }

        const postData = {
            email: email
        }
        dispatch(setLoading(true))
        const api = await passwordForget(postData)
        if(!api.statusCode){
            setSuccess(true)
            dispatch(setLoading(false))
        } else {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = () => {
        history.push('/')
    }

    return (
        <Div className={'c-app c-default-layout flex-row align-items-center'}>
            <CContainer>
                <CRow className={'justify-content-center'}>
                    <CCol md={'4'}>
                        <CCardGroup>
                            <CCard className={'p-4'}>
                                <Logo className={'mx-auto mb-2'}/>
                                <CCardBody className={'p-0'}>
                                    {success === false && <CForm onSubmit={handleSubmit}>
                                        <Heading1>{'Forget Password'}</Heading1>
                                        <Para className={'text-muted'}>{'Reset your account password'}</Para>
                                        <CInputGroup className={'mb-3'}>
                                            <TextInput
                                                type={'text'}
                                                value={email}
                                                onValueChange={setEmail}
                                                leftIcon={'cil-user'}
                                                placeholder={'Enter email..'}
                                                error={usernameError}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={'6'}>
                                                <Button
                                                    buttonText={'Reset'}
                                                    buttonType={'primary'}
                                                    className={'px-3'}
                                                    disabled={validated}
                                                    type={'submit'}
                                                    loading={loading}
                                                />
                                            </CCol>
                                            <CCol xs={'6'} className={'text-right'}>
                                                <Button
                                                    buttonText={'Go Back To Login!'}
                                                    buttonType={'link'}
                                                    className={'px-0'}
                                                    onClick={handleLogin}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CForm>}
                                    {success !== false && <CForm>
                                        <Heading1>{'Reset Password'}</Heading1>
                                        <Para className={'text-muted'}>{'Reset your account password'}</Para>
                                        <CAlert color={'success'}>
                                            <Para className={'font-weight-bold'}>{'Email Sent Successfully'}</Para> <hr/>
                                            <Para>{'We have e-mailed your password reset link'}</Para>
                                        </CAlert>
                                    </CForm>}
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer autoClose={5000} transition={Slide}/>
        </Div>
    )
}

export default Forget
