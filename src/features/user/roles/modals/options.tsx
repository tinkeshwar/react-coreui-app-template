import React, { useState } from 'react'
import { CCol, CModal, CModalBody, CRow } from '@coreui/react'
import { toast } from 'react-toastify'
import { deleteWithConfirmation } from '../../../../helper'
import { changeRoleStatus, deleteSelectedRole } from '../../api'
import { loadRoles, loadSelectedRole, selectLoading, selectSelectedRole, selectSelectedRolePage, setLoading } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { RoleResponseType, StatusChangeType } from '../../type'
import { RoleEdit, RolePermissions } from '../..'
import { WidgetButton } from '../../../../asset'

const RoleOptionBox = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal:(value: boolean) =>  any
}) => {

    const dispatch = useDispatch()

    const [showEditRoleModal, setShowEditRoleModal] = useState<boolean>(false)
    const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false)

    const loading: boolean = useSelector(selectLoading)
    const selectedPage: number = useSelector(selectSelectedRolePage)
    const role: RoleResponseType = useSelector(selectSelectedRole)

    const handleChangeStatus = async () => {
        dispatch(setLoading(true))
        const response: StatusChangeType = await changeRoleStatus(role.id)
        if(response.status === true || response.status === false){
            dispatch(loadRoles(selectedPage, 10))
            dispatch(loadSelectedRole(role.id))
            toast.success(`Role ${response.status ? 'activated':'deactivated'} successfully.`)
        }
        dispatch(setLoading(false))
    }

    const handleEdit = () => {
        setShowEditRoleModal(!showEditRoleModal)
        setShowModal(false)
    }

    const handleDelete = () => {
        setShowModal(false)
        deleteWithConfirmation(
            async () => {
                dispatch(setLoading(true))
                const deleted = await deleteSelectedRole(role.id)
                setTimeout(()=>{
                    if(deleted.id){
                        dispatch(loadRoles(selectedPage, 10))
                        toast.success('Role deleted successfully.')
                    }
                }, 500)
                dispatch(setLoading(false))
            },
            () => setShowModal(true)
        )
    }

    const handleRolePermission = () => {
        setShowModal(false)
        setShowPermissionModal(true)
    }

    return (
        <>
        <CModal
            show={showModal}
            onClose={setShowModal}
            color={'primary'}
            centered={true}
        >
            <CModalBody>
                <CRow>
                    <CCol md={12} className={'mb-2'}>
                        <WidgetButton
                            buttonColor={`${role.status?'success':'danger'}`}
                            buttonTextLarge={role.status? 'Active':'Not Active'}
                            clickHandle={handleChangeStatus}
                            icon={role.status?'cilCheck':'cilWarning'}
                            loading={loading}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <WidgetButton
                            buttonColor={'info'}
                            buttonTextSmall={'Edit'}
                            clickHandle={handleEdit}
                            icon={'cilPencil'}
                            loading={loading}
                        />
                    </CCol>
                    <CCol className={'pl-0'}>
                        <WidgetButton
                            buttonColor={'danger'}
                            buttonTextSmall={'Delete'}
                            clickHandle={handleDelete}
                            icon={'cilTrash'}
                            loading={loading}
                        />
                    </CCol>
                    <CCol className={'pl-0'}>
                        <WidgetButton
                            buttonColor={'success'}
                            buttonTextSmall={'Permissions'}
                            clickHandle={handleRolePermission}
                            icon={'cilFingerprint'}
                            loading={loading}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
        <RoleEdit
            showModal={showEditRoleModal}
            setShowModal={setShowEditRoleModal}
        />
        <RolePermissions
            showModal={showPermissionModal}
            setShowModal={setShowPermissionModal}
        />
        </>
    )
}

export default RoleOptionBox