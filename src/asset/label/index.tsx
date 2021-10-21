import React from 'react'
import { CCol } from '@coreui/react'
import { LabelDisplayPropType } from './type'

export const LabelDisplay = ({
    label,
    value,
    className,
    blank
}:LabelDisplayPropType) => {
    return (
        <>
            <CCol xs={12} md className={'font-weight-bold mb-3'}>{label}</CCol>
            <CCol xs={12} md className={`font-italic mb-3 ${!blank?'border-bottom-dark':''} ${className||''}`}>{!blank?(value || 'NA'):''}</CCol>
        </>
    )
}