import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import { Button, ImageUpload, TextInput } from '../../../asset'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserProfile, selectAuthUser, selectLoading, setLoading } from '../store'
import { AuthUserResponseType, ImagePostType, UserPostType } from '../type'
import { updateUser, uploadUserImage } from '../api'
import { toast } from 'react-toastify'

const MyProfile = () => {

    const dispatch = useDispatch()

    const loading: boolean = useSelector(selectLoading)
    const user: AuthUserResponseType = useSelector(selectAuthUser)

    const [firstname, setFirstName] = useState<string|undefined>()
    const [middlename, setMiddleName] = useState<string|undefined>()
    const [lastname, setLastName] = useState<string|undefined>()
    const [email, setEmail] = useState<string|undefined>()
    const [phone, setPhone] = useState<number|undefined>()
    const [imageFile, setImageFile] = useState<any>()
    const [userImage, setUserImage] = useState<string|undefined>('')

    const uploadImage = async (images: any) => {
        const formData = new FormData()
        formData.append('image', images[0], images[0].filename || 'temp.png')
        return await uploadUserImage(formData)
    }

    const handleEditUser = async () => {
        dispatch(setLoading(true))
        let image = {} as ImagePostType
        if(imageFile?.length){
            image = await uploadImage(imageFile)
        }
        const postData: UserPostType = {
            firstname,
            middlename,
            lastname,
            phone,
        }
        if(Object.keys(image).length !== 0){
            postData.image = image
        }
        const response = await updateUser(postData)
        if (response.id) {
            dispatch(loadUserProfile())
            toast.success('Profile updated successfully.')
        }
        dispatch(setLoading(false))
    }

    useEffect(()=>{
        setFirstName(user.firstname)
        setMiddleName(user.middlename||'')
        setLastName(user.lastname||'')
        setEmail(user.email)
        setPhone(user.phone)
        setUserImage(user.image?.public_url||'')
    },[user])

    return (
        <CCard className={'h-100'}>
            <CCardHeader color={'primary'} className={'text-white'}>My Profile</CCardHeader>
            <CCardBody>
                <CRow className={'my-2'}>
                    <CCol md={4}>
                        <CRow>
                            <CCol>
                                <ImageUpload
                                    width={200}
                                    height={220}
                                    onUploadSelect={setImageFile}
                                    thumb={userImage?userImage:''}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol md={8}>
                        <CRow className={'mb-3'}>
                            <CCol md={12}>
                                <TextInput
                                    label={'First Name'}
                                    value={firstname || ''}
                                    onValueChange={setFirstName}
                                    placeholder={'First Name'}
                                    required={true}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={6}>
                                <TextInput
                                    label={'Middle Name'}
                                    value={middlename || ''}
                                    onValueChange={setMiddleName}
                                    placeholder={'Middle Name'}
                                />
                            </CCol>
                            <CCol md={6}>
                                <TextInput
                                    label={'Last name'}
                                    value={lastname || ''}
                                    onValueChange={setLastName}
                                    placeholder={'Last Name'}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow className={'mt-2'}>
                    <CCol md={6}>
                        <TextInput
                            label={'E-mail'}
                            value={email || ''}
                            onValueChange={setEmail}
                            placeholder={'E-mail'}
                            required={true}
                            readonly={true}
                        />
                    </CCol>
                    <CCol md={6}>
                        <TextInput
                            label={'Phone'}
                            value={phone || ''}
                            onValueChange={setPhone}
                            placeholder={'Phone'}
                            required={true}
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
                />
            </CCardFooter>
        </CCard>
    )
}

export default MyProfile