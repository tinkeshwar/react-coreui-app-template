import { CCol, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CSwitch } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InfoBox } from '../../../../asset'
import { patchSelectedRolePermission, toggleRolePermission } from '../../api'
import { getFormattedPermissions, getPillColor } from '../../helper'
import { loadPermissionDropdownItems, loadSelectedRole, selectLoading, selectPermissionDropdownItems, selectSelectedRole } from '../../store'
import { DropdownItemType, RoleResponseType } from '../../type'

const RolePermissions = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any
}) => {

    const dispatch = useDispatch()
    const selectedPage: RoleResponseType = useSelector(selectSelectedRole)
    const loading = useSelector(selectLoading)
    const permissions = useSelector(selectPermissionDropdownItems)

    const [errorMessage, setErrorMessage] = useState('')

    const restoreInitialState = () => {
        setErrorMessage('')
    }

    const togglePermission = async (id: number) => {

        setErrorMessage('')
        const postData = {
            permission: id
        }

        const response = await toggleRolePermission(selectedPage.id,postData)

        if (response.id) {
            restoreInitialState()
            dispatch(loadPermissionDropdownItems())
            dispatch(loadSelectedRole(selectedPage.id))
        }else if (response.statusCode) {
            setErrorMessage(response.message)
        }else {
            setErrorMessage('Something went wrong, please try again later.')
        }
    }

    const grantAllHandle = async () => {
        setErrorMessage('')
        const postData = {
            permissions: permissions.map((item:DropdownItemType )=>item.id)
        }

        const response = await patchSelectedRolePermission(selectedPage.id,postData)

        if (response.id) {
            restoreInitialState()
            dispatch(loadPermissionDropdownItems())
            dispatch(loadSelectedRole(selectedPage.id))
        }else if (response.statusCode) {
            setErrorMessage(response.message)
        }else {
            setErrorMessage('Something went wrong, please try again later.')
        }
    }

    useEffect(()=>{
        dispatch(loadPermissionDropdownItems())
    },[dispatch])

    return (
        <CModal
            show={showModal}
            onClose={() => setShowModal(!showModal)}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{`Permissions (${permissions.length})`}</CModalTitle>
            </CModalHeader>
            <InfoBox message={errorMessage} displayPrimary={false}/>
            <CModalBody>
                <CRow className={'my-2'}>
                    {getFormattedPermissions(permissions).map((permission: {label: string, group: DropdownItemType[]}) =>
                    <CCol md={12} className={'mb-1 border py-1'} key={`permission-group-${permission.label}`}>
                        <CRow>
                            <CCol md={12}><CLabel className={'font-weight-bold'}>{permission.label.toUpperCase()}</CLabel></CCol>
                            <CCol md={12}>
                                <CRow>
                                {permission.group.map((item)=>
                                    <CCol md={4} key={`permission-item-${item.id}`}>
                                        <CFormGroup variant={'custom-checkbox'} inline>
                                            {loading && <CSpinner/>}
                                            {!loading && <CSwitch
                                                label={item.title}
                                                className={'mx-1'}
                                                variant={'opposite'}
                                                color={getPillColor(item.title)}
                                                shape={'pill'}
                                                labelOn={'on'}
                                                labelOff={'off'}
                                                checked={selectedPage?.permissions?.map(i=>i.id)?.includes((typeof item.id === 'number')?item.id:0)}
                                                size={'sm'}
                                                onChange={()=>{togglePermission((typeof item.id === 'number')?item.id:0)}}
                                            />}
                                            <CLabel>{item.title}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                )}
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCol>)}
                </CRow>
            </CModalBody>
            <CModalFooter>
                <Button onClick={grantAllHandle} buttonText={'Grant All'} buttonType={'primary'} loading={loading}/>
                <Button onClick={() => setShowModal(!showModal)} buttonText={'Cancel'} buttonType={'secondary'}/>
            </CModalFooter>
        </CModal>
    )
}

export default RolePermissions