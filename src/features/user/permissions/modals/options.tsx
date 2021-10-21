import React, { useState } from 'react'
import { CCol, CModal, CModalBody, CRow } from '@coreui/react'
import { toast } from 'react-toastify'
import { deleteWithConfirmation } from '../../../../helper'
import { changePermissionStatus, deleteSelectedPermission } from '../../api'
import { loadPermissions, loadSelectedPermission, selectLoading, selectSelectedPermission, selectSelectedPermissionPage, setLoading } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { PermissionResponseType, StatusChangeType } from '../../type'
import { WidgetButton } from '../../../../asset'

const PermissionOptionBox = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal:(value: boolean) =>  any
}) => {

    const dispatch = useDispatch()

    const [showEditPermissionModal, setShowEditPermissionModal] = useState<boolean>(false)

    const loading: boolean = useSelector(selectLoading)
    const selectedPage: number = useSelector(selectSelectedPermissionPage)
    const permission: PermissionResponseType = useSelector(selectSelectedPermission)
    const isActive = false

    const handleChangeStatus = async () => {
        dispatch(setLoading(true))
        const response: StatusChangeType = await changePermissionStatus(permission.id)
        if(response.status === true || response.status === false){
            dispatch(loadPermissions(selectedPage, 10))
            dispatch(loadSelectedPermission(permission.id))
            toast.success(`Permission ${response.status ? 'activated':'deactivated'} successfully.`)
        }
        dispatch(setLoading(false))
    }

    const handleEdit = () => {
        setShowEditPermissionModal(!showEditPermissionModal)
        setShowModal(false)
    }

    const handleDelete = () => {
        setShowModal(false)
        deleteWithConfirmation(
            async () => {
                dispatch(setLoading(true))
                const deleted = await deleteSelectedPermission(permission.id)
                setTimeout(()=>{
                    if(deleted.id){
                        dispatch(loadPermissions(selectedPage, 10))
                        toast.success('Permission deleted successfully.')
                    }
                }, 500)
                dispatch(setLoading(false))
            },
            () => setShowModal(true)
        )
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
                            buttonColor={`${permission.status?'success':'danger'}`}
                            buttonTextLarge={permission.status? 'Active':'Not Active'}
                            clickHandle={handleChangeStatus}
                            icon={permission.status?'cilCheck':'cilWarning'}
                            loading={loading}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <WidgetButton
                            buttonColor={'info'}
                            buttonTextSmall={'Edit'}
                            clickHandle={isActive? handleEdit:()=>{}}
                            isDisabled={true}
                            icon={'cilPencil'}
                            loading={loading}
                        />
                    </CCol>
                    <CCol className={'pl-0'}>
                        <WidgetButton
                            buttonColor={'danger'}
                            buttonTextSmall={'Delete'}
                            clickHandle={isActive? handleDelete: ()=>{}}
                            isDisabled={true}
                            icon={'cilTrash'}
                            loading={loading}
                        />
                    </CCol>
                </CRow>
            </CModalBody>
        </CModal>
        </>
    )
}

export default PermissionOptionBox