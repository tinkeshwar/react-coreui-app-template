import { CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { InfoBox, TextInput, Button } from '../../../../asset'
import { createNewRole } from '../../api'
import { loadRoles, selectLoading, selectSelectedRolePage, setLoading } from '../../store'
import { RoleResponseType } from '../../type'

const CreateRole = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any
}) => {

    const dispatch = useDispatch()

    const selectedPage:number = useSelector(selectSelectedRolePage)
    const loading: boolean = useSelector(selectLoading)

    const [name, setName] = useState<string|undefined>(undefined)
    const [alias, setAlias] = useState<string|undefined>(undefined)
    const [description, setDescription] = useState<string|undefined>(undefined)

    const restoreInitialState = () => {
        setName(undefined)
        setAlias(undefined)
        setDescription(undefined)
    }

    const handleAddRole = async () => {
        dispatch(setLoading(true))
        const postData = {
            name,
            alias,
            description
        }
        const response: RoleResponseType = await createNewRole(postData)
        if (response.id) {
            dispatch(loadRoles(selectedPage,10))
            restoreInitialState()
            setShowModal(!showModal)
            toast.success('Role created successfully.')
        }
        dispatch(setLoading(false))
    }

    const disabled = !name || !alias || !description

    return (
        <CModal
            show={showModal}
            onClose={() => setShowModal(!showModal)}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{'Add Role'}</CModalTitle>
            </CModalHeader>
            <InfoBox/>
            <CModalBody>
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <TextInput
                            label={'Role Name'}
                            value={name || ''}
                            onValueChange={setName}
                            placeholder={'Role Name'}
                            required={true}
                        />
                    </CCol>
                </CRow>
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <TextInput
                            label={'Alias'}
                            value={alias || ''}
                            onValueChange={setAlias}
                            placeholder={'Alias'}
                            required={true}
                        />
                    </CCol>
                </CRow>
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <TextInput
                            label={'Description'}
                            value={description || ''}
                            onValueChange={setDescription}
                            placeholder={'Description'}
                            required={true}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <Button onClick={handleAddRole} buttonText={'Save'} buttonType={'primary'} disabled={disabled} loading={loading}/>
                <Button onClick={() => setShowModal(!showModal)} buttonText={'Cancel'} buttonType={'secondary'}/>
            </CModalFooter>
        </CModal>
    )
}

export default CreateRole