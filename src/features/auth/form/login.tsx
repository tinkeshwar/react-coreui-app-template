import React, { useEffect, useState } from 'react'
import {
    CContainer,
    CRow, CCol,
    CCardGroup,
    CCard, CCardBody,
    CForm, CInputGroup,
} from '@coreui/react'
import { Redirect, useHistory } from 'react-router-dom'
import { Div, Heading1, Para } from '../styled'
import { TextInput } from '../../../asset'
import { Button } from '../../../asset/buttons'
import { isEmail } from '../../../helper'
import { logUser, loadRefresh, selectIsLoggedIn, selectLoading, setLoading } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../api'
import { AuthResponseType } from '../type'
import { Slide, ToastContainer } from 'react-toastify'
import { Logo } from '../../layout'

const Login = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(loadRefresh())
        }
    },[dispatch, isLoggedIn])

    const loading: boolean = useSelector(selectLoading)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [usernameError, setUsernameError] = useState<string>('')

    const validated = !username || !password

    const handelSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setLoading(true))
        if(!isEmail(username)) {
            setUsernameError('Invalid email address..')
            return false
        }
        const data = {
            email:username,
            password
        }
        const api: AuthResponseType = await signIn(data) as any
        if(api !==undefined && api?.user?.id){
            dispatch(logUser(api))
            history.push('/dashboard')
        }
        dispatch(setLoading(false))
    }

    const handlePasswordRest = () => {
        history.push('/forget')
    }


    return (
        <>{!isLoggedIn && <Div className={'c-app c-default-layout flex-row align-items-center'}>
            <CContainer>
                <CRow className={'justify-content-center'}>
                    <CCol md={4} sm={12}>
                        <CCardGroup>
                            <CCard className={'p-4'}>
                                <Logo className={'mx-auto mb-2'}/>
                                <CCardBody className={'p-0'}>
                                    <CForm onSubmit={handelSubmit}>
                                        <Heading1>{'Login'}</Heading1>
                                        <Para className={'text-muted'}>{'Sign In to your account'}</Para>
                                        <CInputGroup className={'mb-3'}>
                                            <TextInput
                                                type={'text'}
                                                value={username}
                                                onValueChange={setUsername}
                                                leftIcon={'cil-user'}
                                                placeholder={'Enter email..'}
                                                error={usernameError}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className={'mb-4'}>
                                            <TextInput
                                                type={'password'}
                                                value={password}
                                                onValueChange={setPassword}
                                                leftIcon={'cil-lock-locked'}
                                                placeholder={'Enter password..'}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={'6'}>
                                                <Button
                                                    buttonText={'Sign In'}
                                                    buttonType={'primary'}
                                                    className={'px-3'}
                                                    disabled={validated}
                                                    type={'submit'}
                                                    loading={loading}
                                                />
                                            </CCol>
                                            <CCol xs={'6'} className={'text-right'}>
                                                <Button
                                                    buttonText={'Forgot password?'}
                                                    buttonType={'link'}
                                                    className={'px-0'}
                                                    onClick={handlePasswordRest}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
            <ToastContainer autoClose={5000} transition={Slide}/>
        </Div>}
        {isLoggedIn && <Redirect to='/dashboard'/>}
        </>
    )
}

export default Login
