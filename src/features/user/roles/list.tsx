import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CDataTable, CPagination, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RoleCreate, RoleOptionBox } from '..'
import { Button } from '../../../asset'
import { getRolesForList, getTotalPages } from '../helper'
import { loadRoles, loadSelectedRole, selectLoading, selectMeta, selectRoles, selectSelectedRolePage, setSelectedRolePage } from '../store'
import { MetaType, RoleListCustomType, RoleResponseType } from '../type'

const RoleList = () => {
    const dispatch = useDispatch()
    const loading: boolean = useSelector(selectLoading)
    const selectedPage:number = useSelector(selectSelectedRolePage)
    const roles: RoleResponseType[] = useSelector(selectRoles)
    const meta: MetaType = useSelector(selectMeta)

    const totalPages: number = getTotalPages(meta)

    const [showCreateRoleModal, setShowCreateRoleModal] = useState<boolean>(false)
    const [showRoleOptionBoxModal, setShowRoleOptionBoxModal] = useState<boolean>(false)

    const handleRow =(item: RoleListCustomType) => {
        dispatch(loadSelectedRole(item.Id))
        setShowRoleOptionBoxModal(true)
    }

    const handlePageChange = (pageNumber: number) => {
        dispatch(setSelectedRolePage(pageNumber))
    }

    useEffect(()=>{
        dispatch(loadRoles(selectedPage, 10))
    },[dispatch, selectedPage])

    return (
        <CRow>
            <CCol xs={'12'} lg={'12'}>
                <CCard>
                    <CCardHeader>
                        {'Role List'}
                        <Button
                            buttonType={'primary'}
                            onClick={() => setShowCreateRoleModal(!showCreateRoleModal)}
                            className={'mx-1 float-right btn-sm'}
                            buttonText={'Add Role'}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            loading={loading}
                            items={getRolesForList(roles)}
                            fields={['Name', 'Description', 'Status']}
                            striped
                            itemsPerPage={10}
                            onRowClick={handleRow}
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
            <RoleCreate
                showModal={showCreateRoleModal}
                setShowModal={setShowCreateRoleModal}
            />
            <RoleOptionBox
                showModal={showRoleOptionBoxModal}
                setShowModal={setShowRoleOptionBoxModal}
            />
        </CRow>
    )
}

export default RoleList