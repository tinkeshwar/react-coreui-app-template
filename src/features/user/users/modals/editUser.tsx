import { CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { InfoBox, TextInput, Button, ImageUpload } from '../../../../asset'
import { patchSelectedUser, uploadUserImage } from '../../api'
import { loadUsers, selectSelectedUserPage, selectSelectedUser, selectLoading, setLoading } from '../../store'
import { ImagePostType, UserPostType, UserResponseType } from '../../type'

const EditUser = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any,
}) => {

    const dispatch = useDispatch()

    const selectedPage:number = useSelector(selectSelectedUserPage)
    const loading: boolean = useSelector(selectLoading)
    const user: UserResponseType = useSelector(selectSelectedUser)

    const [firstname, setFirstName] = useState<string|undefined>(user.firstname)
    const [middlename, setMiddleName] = useState<string|undefined>(user.middlename || '')
    const [lastname, setLastName] = useState<string|undefined>(user.lastname || '')
    const [email, setEmail] = useState<string|undefined>(user.email)
    const [phone, setPhone] = useState<number|undefined>(user.phone)
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
            email,
            phone,
        }
        if(Object.keys(image).length !== 0){
            postData.image = image
        }
        const response = await patchSelectedUser(user.id, postData)
        if (response.id) {
            dispatch(loadUsers(selectedPage,10))
            setShowModal(!showModal)
            toast.success('User updated successfully.')
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        setFirstName(user.firstname)
        setMiddleName(user.middlename || '')
        setLastName(user.lastname || '')
        setEmail(user.email)
        setPhone(user.phone)
        setUserImage(user?.image?.public_url)
    }, [user])

    const disabled = !firstname || !email || !phone

    return (
        <CModal
            show={showModal}
            onClose={() => setShowModal(!showModal)}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{'Edit User'}</CModalTitle>
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
                                    thumb={userImage?userImage:''}
                                    clearPreview={!showModal}
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol md={8}>
                        <CRow>
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
            </CModalBody>
            <CModalFooter>
                <Button onClick={handleEditUser} buttonText={'Update'} buttonType={'primary'} disabled={disabled} loading={loading}/>
                <Button onClick={() => setShowModal(!showModal)} buttonText={'Cancel'} buttonType={'secondary'}/>
            </CModalFooter>
        </CModal>
    )
}

export default EditUser