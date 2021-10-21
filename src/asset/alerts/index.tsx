import { CRow, CCol, CAlert } from '@coreui/react'
import React from 'react'
import { infoBoxTypeProp } from './type'

export const InfoBox = ({
    message,
    style,
    displayPrimary
}:infoBoxTypeProp) => {
    return (
        <CRow className={'mt-1 p-0 mx-0'}>
            <CCol md={12}>
                {message && <CAlert color={style || 'danger'}>
                    {message}
                </CAlert>}
                {(!message && displayPrimary !== false) && <CAlert color={'warning'}>
                    {'All field marked with astirisk (*) are required.'}
                </CAlert>}
            </CCol>
        </CRow>
    )
}