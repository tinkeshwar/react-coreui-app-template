import React, { useEffect, useState } from 'react'
import {
    CContainer,
    CRow, CCol,
    CCardGroup,
    CCard, CCardBody,
    CForm, CInputGroup
} from '@coreui/react'
import { useHistory, useLocation } from 'react-router-dom'
import { Div, Heading1, Para } from '../styled'
import { TextInput } from '../../../asset'
import { Button } from '../../../asset/buttons'
import { loadRefresh, selectIsLoggedIn, selectLoading, setLoading } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { passwordRest } from '../api'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { Logo } from '../../layout'

const Reset = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn)
    const search = useLocation().search
    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(loadRefresh())
        }
    }, [dispatch, isLoggedIn])

    if (isLoggedIn) history.push('/dashboard')

    const loading: boolean = useSelector(selectLoading)

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

    const validated = !password || !confirmPassword

    const restoreInitialState = () => {
        setPassword('')
        setPasswordError('')
        setConfirmPassword('')
        setConfirmPasswordError('')
    }

    const handelSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        if (password !== confirmPassword) {
            setConfirmPasswordError('Password Mismatch')
            return false
        }

        const token = new URLSearchParams(search).get('token')
        const code = new URLSearchParams(search).get('code')

        const postData = {
            recovery_token: token,
            verfication_code: code,
            password: confirmPassword
        }

        dispatch(setLoading(true))
        const api = await passwordRest(postData)
        if (!api.statusCode) {
            restoreInitialState()
            toast.success('Password Reset Successfully!')
            toast.info('Redirect to login page')
            dispatch(setLoading(false))
            setTimeout(()=>{
                history.push('/')
            },5000)
        } else {
            dispatch(setLoading(false))
        }
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
                                    <CForm onSubmit={handelSubmit}>
                                        <Heading1>{'Reset Password'}</Heading1>
                                        <Para className={'text-muted'}>{'Create New Password'}</Para>
                                        <CInputGroup className={'mb-3'}>
                                            <TextInput
                                                type={'password'}
                                                value={password}
                                                onValueChange={setPassword}
                                                leftIcon={'cil-lock-locked'}
                                                placeholder={'Enter Password'}
                                                error={passwordError}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className={'mb-3'}>
                                            <TextInput
                                                type={'password'}
                                                value={confirmPassword}
                                                onValueChange={setConfirmPassword}
                                                leftIcon={'cil-lock-locked'}
                                                placeholder={'Enter Confirm Password'}
                                                error={confirmPasswordError}
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
                                        </CRow>
                                    </CForm>
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

export default Reset