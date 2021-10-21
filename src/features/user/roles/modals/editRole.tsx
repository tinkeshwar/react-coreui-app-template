import { CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { InfoBox, TextInput, Button, Textarea } from '../../../../asset'
import { patchSelectedRole } from '../../api'
import { loadRoles, selectSelectedRolePage, selectSelectedRole, selectLoading } from '../../store'
import { RoleResponseType } from '../../type'

const EditRole = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any,
}) => {
    const dispatch = useDispatch()

    const selectedPage: number = useSelector(selectSelectedRolePage)
    const role: RoleResponseType = useSelector(selectSelectedRole)
    const loading: boolean = useSelector(selectLoading)

    const [name, setName] = useState<string|undefined>(role.name)
    const [alias, setAlias] = useState<string|undefined>(role.alias)
    const [description, setDescription] = useState<string|undefined>(role.description)
    const [sidebar, setSidebar] = useState<string>('')

    const handleEditRole = async () => {
        const postData = {
            name,
            alias,
            description,
            sidebar
        }
        const response: RoleResponseType = await patchSelectedRole(role.id, postData)
        if (response.id) {
            dispatch(loadRoles(selectedPage,10))
            setShowModal(!showModal)
            toast.success('Role updated successfully.')
        }
    }

    useEffect(() => {
        setName(role.name)
        setAlias(role.alias)
        setDescription(role.description)
        setSidebar(role?.role_sidebar?.sidebar)
    }, [role])

    const disabled = !name || !alias || !description || !sidebar

    return (
        <CModal
            show={showModal}
            onClose={() => setShowModal(!showModal)}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{'Edit Role'}</CModalTitle>
            </CModalHeader>
            <InfoBox/>
            <CModalBody>
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <TextInput
                            label={'Name'}
                            value={name || ''}
                            onValueChange={setName}
                            placeholder={'Name'}
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
                <CRow className={'my-2'}>
                    <CCol md={12}>
                        <Textarea
                            rows={5}
                            label={'Sidebar'}
                            value={sidebar || ''}
                            onValueChange={setSidebar}
                            placeholder={'Sidebar'}
                            required={true}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <Button onClick={handleEditRole} buttonText={'Update'} buttonType={'primary'} disabled={disabled} loading={loading}/>
                <Button onClick={() => setShowModal(!showModal)} buttonText={'Cancel'} buttonType={'secondary'}/>
            </CModalFooter>
        </CModal>
    )
}

export default EditRole