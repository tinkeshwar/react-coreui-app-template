import CIcon from '@coreui/icons-react'
import React from 'react'
import { FieldsetTag, Heading4 } from './style'
import { FieldsetTypeProp } from './type'

export const Fieldset = ({
    children,
    label,
    icon,
    downBorder
}:FieldsetTypeProp) => {
    return (
        <FieldsetTag className={`form-group bg-white ${downBorder?'border-bottom':''}`}>
            <Heading4 className={'text-uppercase text-primary border-bottom mb-3'}>{icon && <CIcon name={icon} />} {label}</Heading4>
            {children}
        </FieldsetTag>
    )
}