import CIcon from '@coreui/icons-react'
import { CLabel, CInputRadio, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText } from '@coreui/react'
import React from 'react'
import { RadioPropType } from './type'

export const Radio = ({
    items,
    onValueChange,
    label,
    leftIcon,
    leftText,
    selected,
    required
}: RadioPropType) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (onValueChange) {
            return onValueChange(event.target.value)
        }

        throw new Error('Provide either onChange or onValueChange to Input component.')
    }

    return (
        <>
            {label && <CLabel className={required?'required-class font-weight-bolder':'font-weight-bolder'}>{label}</CLabel>}
            <CInputGroup>
            {(leftIcon || leftText) && <CInputGroupPrepend>
                <CInputGroupText className={(required && !label)?'required-class':''}>
                    {leftIcon && <CIcon name={leftIcon} />}
                    {leftText && <>{leftText}</>}
                </CInputGroupText>
            </CInputGroupPrepend>}
            {items.map(item =>
                <CFormGroup variant={'custom-radio'} className={'pt-1'} inline key={item.id}>
                    <CInputRadio id={`${item.id}`} name={label} value={item.id} onChange={handleChange} checked={item.id === selected}></CInputRadio>
                    <CLabel htmlFor={`${item.id}`}>{item.title}</CLabel>
                </CFormGroup>
            )}
            </CInputGroup>
        </>
    )
}