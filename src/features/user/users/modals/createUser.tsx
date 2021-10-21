import { CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, ImageUpload, InfoBox, TextInput } from '../../../../asset'
import { createNewUser, uploadUserImage } from '../../api'
import { loadUsers, selectLoading, selectSelectedUserPage, setLoading } from '../../store'
import { ImagePostType, UserPostType, UserResponseType } from '../../type'

const CreateUser = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any
}) => {

    const dispatch = useDispatch()

    const selectedPage: number = useSelector(selectSelectedUserPage)
    const loading: boolean = useSelector(selectLoading)

    const [firstname, setFirstName] = useState<string|undefined>(undefined)
    const [middlename, setMiddleName] = useState<string|undefined>(undefined)
    const [lastname, setLastName] = useState<string|undefined>(undefined)
    const [email, setEmail] = useState<string|undefined>(undefined)
    const [phone, setPhone] = useState<number|undefined>(undefined)
    const [password, setPassword] = useState<string|undefined>(undefined)
    const [imageFile, setImageFile] = useState<any>(undefined)

    const restoreInitialState = () => {
        setFirstName(undefined)
        setMiddleName(undefined)
        setLastName(undefined)
        setEmail(undefined)
        setPhone(undefined)
        setPassword(undefined)
    }

    const onModalClose = () => {
        restoreInitialState()
        setShowModal(!showModal)
    }

    const uploadImage = async (images: any) => {
        const formData = new FormData()
        formData.append('image', images[0], images[0].filename || 'temp.png')
        return await uploadUserImage(formData)
    }

    const handleAddUser = async () => {
        dispatch(setLoading(true))
        let image = {} as ImagePostType
        if(imageFile?.length){
            image = await uploadImage(imageFile)
        }
        const postData: UserPostType = {
            firstname,
            middlename,
            lastname,
            email,
            phone,
            password
        }
        if(Object.keys(image).length !== 0){
            postData.image = image
        }
        const response: UserResponseType = await createNewUser(postData)
        if (response.id) {
            dispatch(loadUsers(selectedPage,10))
            restoreInitialState()
            setShowModal(!showModal)
            toast.success('User created successfully.')
        }
        dispatch(setLoading(false))
    }

    const disabled = !firstname || !email || !phone || !password

    return (
        <CModal
            show={showModal}
            onClose={() => onModalClose()}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{'Add User'}</CModalTitle>
            </CModalHeader>
            <InfoBox/>
            <CModalBody>
                <CRow className={'my-2'}>
                    <CCol md={4}>
                        <CRow>
                            <CCol>
                                <ImageUpload
                                    width={200}
                                    height={220}
                                    onUploadSelect={setImageFile}
                                    clearPreview={!showModal}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol md={8}>
                        <CRow>
                            <CCol md={12} className={'mb-2'}>
                                <TextInput
                                    label={'First Name'}
                                    value={firstname || ''}
                                    onValueChange={setFirstName}
                                    placeholder={'First Name'}
                                    required={true}
                                />
                            </CCol>
                            <CCol md={6} className={'my-2'}>
                                <TextInput
                                    label={'Middle Name'}
                                    value={middlename || ''}
                                    onValueChange={setMiddleName}
                                    placeholder={'Middle Name'}
                                />
                            </CCol>
                            <CCol md={6} className={'mt-2'}>
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
                <CRow className={'my-2'}>
                    <CCol md={6}>
                        <TextInput
                            label={'E-mail'}
                            value={email || ''}
                            onValueChange={setEmail}
                            placeholder={'E-mail'}
                            required={true}
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
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <TextInput
                            label={'Password'}
                            value={password || ''}
                            onValueChange={setPassword}
                            placeholder={'Password'}
                            required={true}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <Button onClick={handleAddUser} buttonText={'Save'} buttonType={'primary'} disabled={disabled} loading={loading}/>
                <Button onClick={() => setShowModal(!showModal)} buttonText={'Cancel'} buttonType={'secondary'}/>
            </CModalFooter>
        </CModal>
    )
}

export default CreateUser