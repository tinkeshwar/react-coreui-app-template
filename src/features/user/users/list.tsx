import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CDataTable, CPagination, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserCreate, UserOptionBox } from '..'
import { Button } from '../../../asset'
import { getTotalPages, getUsersForList } from '../helper'
import { loadSelectedUser, loadUsers, selectLoading, selectMeta, selectSelectedUserPage, selectUsers, setSelectedUserPage } from '../store'
import { MetaType, UserListCustomType, UserResponseType } from '../type'

const UserList = () => {

    const dispatch = useDispatch()
    const selectedPage: number = useSelector(selectSelectedUserPage)
    const usersRaw: UserResponseType[] = useSelector(selectUsers)
    const meta: MetaType = useSelector(selectMeta)
    const loading: boolean = useSelector(selectLoading)

    const totalPages: number = getTotalPages(meta)

    const [showCreateUserModal, setShowCreateUserModal] = useState<boolean>(false)
    const [showUserOptionBoxModal, setShowUserOptionBoxModal] = useState<boolean>(false)

    const handlePageChange = (pageNumber: number) => {
        dispatch(setSelectedUserPage(pageNumber))
    }

    const handleRow = (item: UserListCustomType) => {
        dispatch(loadSelectedUser(item.Id))
        setShowUserOptionBoxModal(true)
    }

    useEffect(()=>{
        dispatch(loadUsers(selectedPage, 10))
    },[dispatch, selectedPage])

    return (
        <CRow>
            <CCol xs={'12'} lg={'12'}>
                <CCard>
                    <CCardHeader>
                        {'User List'}
                        <Button
                            buttonType={'primary'}
                            onClick={() => setShowCreateUserModal(!showCreateUserModal)}
                            className={'mx-1 float-right btn-sm'}
                            buttonText={'Add User'}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            loading={loading}
                            items={getUsersForList(usersRaw)}
                            fields={['Name', 'Email', 'Phone', 'Status']}
                            striped
                            itemsPerPage={10}
                            onRowClick={handleRow}
                            clickableRows={true}
                        />
                    </CCardBody>
                    <CCardFooter>
                        <CPagination
                            activePage={selectedPage}
                            pages={totalPages}
                            onActivePageChange={(pageNumber: number)=>handlePageChange(pageNumber)}
                            align={'end'}
                        />
                    </CCardFooter>
                </CCard>
            </CCol>
            <UserCreate
                showModal={showCreateUserModal}
                setShowModal={setShowCreateUserModal}
            />
            <UserOptionBox
                showModal={showUserOptionBoxModal}
                setShowModal={setShowUserOptionBoxModal}
            />
        </CRow>
    )
}

export default UserList