import React, { useState } from 'react'
import { CCol, CModal, CModalBody, CRow } from '@coreui/react'
import { toast } from 'react-toastify'
import { deleteWithConfirmation } from '../../../../helper'
import { changeUserStatus, deleteSelectedUser } from '../../api'
import { loadSelectedUser, loadUsers, selectLoading, selectSelectedUser, selectSelectedUserPage, setLoading } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { StatusChangeType, UserResponseType } from '../../type'
import { UserEdit, UserPermissions, UserRoles } from '../..'
import { WidgetButton } from '../../../../asset'

const UserOptionBox = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal:(value: boolean) =>  any
}) => {

    const dispatch = useDispatch()

    const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false)
    const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false)
    const [showRoleModal, setShowRoleModal] = useState<boolean>(false)

    const loading: boolean = useSelector(selectLoading)
    const selectedPage: number = useSelector(selectSelectedUserPage)
    const user: UserResponseType = useSelector(selectSelectedUser)

    const handleChangeStatus = async () => {
        dispatch(setLoading(true))
        const response: StatusChangeType = await changeUserStatus(user.id)
        if(response.status === true || response.status === false){
            dispatch(loadUsers(selectedPage, 10))
            dispatch(loadSelectedUser(user.id))
            toast.success(`User ${response.status ? 'activated':'deactivated'} successfully.`)
        }
        dispatch(setLoading(false))
    }

    const handleEdit = () => {
        setShowEditUserModal(!showEditUserModal)
        setShowModal(false)
    }

    const handleDelete = () => {
        setShowModal(false)
        deleteWithConfirmation(
            async () => {
                dispatch(setLoading(true))
                const deleted = await deleteSelectedUser(user.id)
                setTimeout(()=>{
                    if(deleted.id){
                        dispatch(loadUsers(selectedPage, 10))
                        toast.success('User deleted successfully.')
                    }
                }, 500)
                dispatch(setLoading(false))
            },
            () => setShowModal(true)
        )
    }

    const handleUserRole = () => {
        setShowModal(false)
        setShowRoleModal(true)
    }

    const handleUserPermission = () => {
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
                            buttonColor={`${user.status?'success':'danger'}`}
                            buttonTextLarge={user.status? 'Active':'Not Active'}
                            clickHandle={handleChangeStatus}
                            icon={user.status?'cilCheck':'cilWarning'}
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
                            buttonColor={'dark'}
                            buttonTextSmall={'Roles'}
                            clickHandle={handleUserRole}
                            icon={'cilFingerprint'}
                            loading={loading}
                        />
                    </CCol>
                    <CCol className={'pl-0'}>
                        <WidgetButton
                            buttonColor={'success'}
                            buttonTextSmall={'Permissions'}
                            clickHandle={handleUserPermission}
                            icon={'cilFingerprint'}
                            loading={loading}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
        <UserEdit
            showModal={showEditUserModal}
            setShowModal={setShowEditUserModal}
        />
        <UserPermissions
            showModal={showPermissionModal}
            setShowModal={setShowPermissionModal}
        />
        <UserRoles
            showModal={showRoleModal}
            setShowModal={setShowRoleModal}
        />
        </>
    )
}

export default UserOptionBox