import CIcon from '@coreui/icons-react'
import { CInputGroupPrepend, CInputGroupText, CInput, CInputGroupAppend, CInvalidFeedback, CLabel, CInputGroup } from '@coreui/react'
import React from 'react'
import { TextInputPropType } from './type'

export const Input = ({
    value,
    onChange,
    onValueChange,
    onBlur,
    type,
    label,
    required,
    placeholder,
    leftIcon,
    leftText,
    rightIcon,
    rightText,
    autocomplete,
    error,
    size,
    className,
    readonly,
    plainText
}: TextInputPropType) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            return onChange(event)
        }

        if (onValueChange) {
            return onValueChange(event.target.value)
        }

        throw new Error('Provide either onChange or onValueChange to Input component.')
    }

    const handleBlur = (event:  React.FocusEvent<HTMLInputElement>) => {
        if(onBlur) {
            return onBlur(event.target.value)
        }
    }

    return (
        <>
        {label && <CLabel className={required?'required-class font-weight-bolder':'font-weight-bolder'}>{label}</CLabel>}
        <CInputGroup>
            {(leftIcon || leftText) && <CInputGroupPrepend >
                <CInputGroupText className={(required && !label)?'required-class font-weight-bolder':'font-weight-bolder'}>
                    {leftIcon && <CIcon name={leftIcon} />}
                    {leftText && <>{leftText}</>}
                </CInputGroupText>
            </CInputGroupPrepend>}
            <CInput
                value={value}
                type={type || 'text'}
                placeholder={ placeholder || 'Enter Here..'}
                autoComplete={autocomplete || 'none'}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={error? true : false}
                size={size}
                className={className}
                readOnly={readonly}
                plaintext={plainText}
            />
            {error && <CInvalidFeedback>{error}</CInvalidFeedback>}
            {(rightIcon || rightText) && <CInputGroupAppend>
                {(rightIcon || rightText) && <CInputGroupText className={'font-weight-bolder'}>
                    {rightIcon && <CIcon name={rightIcon} />}
                    {rightText && <>{rightText}</>}
                </CInputGroupText>}
            </CInputGroupAppend>}
        </CInputGroup>
        </>
    )
}