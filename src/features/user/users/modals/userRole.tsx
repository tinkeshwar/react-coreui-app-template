import { CCol, CFormGroup, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CSwitch } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InfoBox } from '../../../../asset'
import { patchSelectedUserRole, toggleUserRole } from '../../api'
import { loadRoleDropdownItems, loadSelectedUser, selectLoading, selectRoleDropdownItems, selectSelectedUser } from '../../store'
import { DropdownItemType, UserResponseType } from '../../type'

const UserRoles = ({showModal, setShowModal}:{
    showModal:boolean,
    setShowModal: (value:boolean) => any
}) => {

    const dispatch = useDispatch()
    const selectedPage: UserResponseType = useSelector(selectSelectedUser)
    const loading: boolean = useSelector(selectLoading)
    const roles: DropdownItemType[] = useSelector(selectRoleDropdownItems)

    const [errorMessage, setErrorMessage] = useState('')

    const restoreInitialState = () => {
        setErrorMessage('')
    }

    const toggleRole = async (id: number) => {

        setErrorMessage('')
        const postData = {
            role: id
        }

        const response = await toggleUserRole(selectedPage.id,postData)

        if (response.id) {
            restoreInitialState()
            dispatch(loadRoleDropdownItems())
            dispatch(loadSelectedUser(selectedPage.id))
        }else if (response.statusCode) {
            setErrorMessage(response.message)
        }else {
            setErrorMessage('Something went wrong, please try again later.')
        }
    }

    const grantAllHandle = async () => {
        setErrorMessage('')
        const postData = {
            roles: roles.map((item:DropdownItemType )=>item.id)
        }

        const response = await patchSelectedUserRole(selectedPage.id,postData)

        if (response.id) {
            restoreInitialState()
            dispatch(loadRoleDropdownItems())
            dispatch(loadSelectedUser(selectedPage.id))
        }else if (response.statusCode) {
            setErrorMessage(response.message)
        }else {
            setErrorMessage('Something went wrong, please try again later.')
        }
    }

    useEffect(()=>{
        dispatch(loadRoleDropdownItems())
    },[dispatch])

    return (
        <CModal
            show={showModal}
            onClose={() => setShowModal(!showModal)}
            color={'primary'}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{`Roles (${roles?.length})`}</CModalTitle>
            </CModalHeader>
            <InfoBox message={errorMessage} displayPrimary={false}/>
            <CModalBody>
                <CRow className={'my-2'}>
                    {roles.map((role: DropdownItemType) =>
                    <CCol md={12} className={'mb-1 border py-1'} key={`role-group-${role.id}`}>
                        <CRow>
                            <CCol md={6}><CLabel className={'font-weight-bold'}>{role.title.toUpperCase()}</CLabel></CCol>
                            <CCol md={6}>
                                <CFormGroup variant={'custom-checkbox'} inline>
                                    {loading && <CSpinner/>}
                                    {!loading && <CSwitch
                                        className={'mx-1'}
                                        variant={'opposite'}
                                        color={'primary'}
                                        shape={'pill'}
                                        labelOn={'on'}
                                        labelOff={'off'}
                                        checked={selectedPage?.roles?.map(i=>i.id)?.includes((typeof role.id === 'number')?role.id:0)}
                                        size={'lg'}
                                        onChange={()=>toggleRole((typeof role.id === 'number')?role.id:0)}
                                    />}
                                </CFormGroup>
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

export default UserRoles