import CIcon from '@coreui/icons-react'
import { CInputGroupPrepend, CInputGroupText, CTextarea, CInputGroupAppend, CInvalidFeedback, CLabel, CInputGroup } from '@coreui/react'
import React from 'react'
import { TextareaPropType } from './type'

export const Textarea = ({
    value,
    onChange,
    onValueChange,
    rows,
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
    className
}: TextareaPropType) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            return onChange(event)
        }

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
                <CInputGroupText className={(required && !label)?'required-class font-weight-bolder':'font-weight-bolder'}>
                    {leftIcon && <CIcon name={leftIcon} />}
                    {leftText && <>{leftText}</>}
                </CInputGroupText>
            </CInputGroupPrepend>}
            <CTextarea
                value={value}
                rows={rows}
                placeholder={ placeholder || 'Enter Here..'}
                autoComplete={autocomplete || 'none'}
                onChange={handleChange}
                invalid={error? true : false}
                size={size}
                className={className}
            />
            {error && <CInvalidFeedback>{error}</CInvalidFeedback>}
            {(rightIcon || rightText) && <CInputGroupAppend>
                {(rightIcon || rightText) && <CInputGroupText className={'font-weight-bolder'}>
                    {rightIcon && <CIcon name={rightIcon} />}
                    {rightText && <CInputGroupText>{rightText}</CInputGroupText>}
                </CInputGroupText>}
            </CInputGroupAppend>}
        </CInputGroup>
        </>
    )
}