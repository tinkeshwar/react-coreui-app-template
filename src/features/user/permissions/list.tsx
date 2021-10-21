import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CDataTable, CPagination, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PermissionOptionBox } from '..'
import { getPermissionsForList, getTotalPages } from '../helper'
import { loadPermissions, loadSelectedPermission, selectLoading, selectMeta, selectPermissions, selectSelectedPermissionPage, setSelectedPermissionPage } from '../store'
import { MetaType, PermissionListCustomType, PermissionResponseType } from '../type'

const RoleList = () => {
    const dispatch = useDispatch()
    const selectedPage: number = useSelector(selectSelectedPermissionPage)
    const permissions: PermissionResponseType[] = useSelector(selectPermissions)
    const meta: MetaType = useSelector(selectMeta)
    const loading: boolean = useSelector(selectLoading)

    const totalPages: number = getTotalPages(meta)

    const [showPermissionOptionBoxModal, setShowPermissionOptionBoxModal] = useState<boolean>(false)

    const handleRow = (item: PermissionListCustomType) => {
        dispatch(loadSelectedPermission(item.Id))
        setShowPermissionOptionBoxModal(true)
    }

    const handlePageChange = (pageNumber: number) => {
        dispatch(setSelectedPermissionPage(pageNumber))
    }

    useEffect(()=>{
        dispatch(loadPermissions(selectedPage, 10))
    },[dispatch, selectedPage])

    return (
        <CRow>
            <CCol xs={'12'} lg={'12'}>
                <CCard>
                    <CCardHeader>
                        {'Permission List'}
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            loading={loading}
                            items={getPermissionsForList(permissions)}
                            fields={['Name', 'Level', 'Status']}
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
            <PermissionOptionBox
                showModal={showPermissionOptionBoxModal}
                setShowModal={setShowPermissionOptionBoxModal}
            />
        </CRow>
    )
}

export default RoleList