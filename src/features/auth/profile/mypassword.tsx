import { CCard, CCardHeader, CCardBody, CRow, CCol, CCardFooter } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { TextInput, Button } from '../../../asset'
import { updatePassword } from '../api'
import { selectLoading, setLoading, loadUserProfile } from '../store'

const MyPassword = () => {

    const dispatch = useDispatch()

    const loading: boolean = useSelector(selectLoading)
    const [passwordError, setPasswordError] = useState<string|undefined>()
    const [current_password, setCurrentPassword] = useState<string|undefined>()
    const [new_password, setNewPassword] = useState<string|undefined>()
    const [confirm_password, setConfirmPassword] = useState<string|undefined>()

    const resetInitial = () => {
        setPasswordError('')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    const matchPassword = (item:any) => {
        if(new_password !== confirm_password){
            setPasswordError('New password and current password does not match.')
        }else{
            setPasswordError(undefined)
        }
    }

    const handleEditUser = async () => {
        dispatch(setLoading(true))
        const postData = {
            current_password,
            new_password
        }
        const response = await updatePassword(postData)
        if (response.id) {
            dispatch(loadUserProfile())
            resetInitial()
            toast.success('Password updated successfully.')
        }
        dispatch(setLoading(false))
    }

    const disabled = !current_password || !new_password || !confirm_password || !(new_password === confirm_password)

    return (
        <CCard className={'h-100'}>
            <CCardHeader color={'primary'} className={'text-white'}>My Password</CCardHeader>
            <CCardBody>
                <CRow className={'my-2'}>
                    <CCol md={12} className={'mb-3'}>
                        <TextInput
                            type={'password'}
                            label={'Current Password'}
                            value={current_password || ''}
                            onValueChange={setCurrentPassword}
                            placeholder={'Current Password'}
                            required={true}
                        />
                    </CCol>
                    <CCol md={12} className={'mb-3'}>
                        <TextInput
                            type={'password'}
                            label={'New Password'}
                            value={new_password || ''}
                            onValueChange={setNewPassword}
                            onBlur={matchPassword}
                            placeholder={'New Password'}
                            required={true}
                            error={passwordError}
                        />
                    </CCol>
                    <CCol md={12}>
                        <TextInput
                            type={'password'}
                            label={'Confirm Password'}
                            value={confirm_password || ''}
                            onValueChange={setConfirmPassword}
                            onBlur={matchPassword}
                            placeholder={'Confirm Password'}
                            required={true}
                            error={passwordError}
                        />
                    </CCol>
                </CRow>
            </CCardBody>
            <CCardFooter className={'text-right'}>
                <Button
                    buttonType={'primary'}
                    buttonText={'Update'}
                    loading={loading}
                    onClick={handleEditUser}
                    disabled={disabled}
                />
            </CCardFooter>
        </CCard>
    )
}

export default MyPassword