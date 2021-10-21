import CIcon from '@coreui/icons-react'
import { CButton, CSpinner } from '@coreui/react'
import React from 'react'
import { ButtonPropType } from './type'

export const Button = ({
    type,
    buttonText,
    className,
    buttonType,
    buttonStyle,
    iconLeft,
    iconRight,
    loading,
    disabled,
    onClick
}:ButtonPropType) => {
    return (
        <CButton
            variant={buttonStyle || ''}
            type={type || 'button'}
            color={buttonType}
            className={className}
            disabled={disabled || loading || false}
            onClick={onClick}
        >
            {loading && <CSpinner grow={true} color={'danger'} type={'glow'} size={'sm'} />}
            {!loading && <>{iconLeft && <CIcon name={iconLeft}/>} {buttonText || ''} {iconRight && <CIcon name={iconRight}/>}</>}
        </CButton>
    )
}