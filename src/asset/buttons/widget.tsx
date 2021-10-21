import CIcon from '@coreui/icons-react'
import { CCol, CRow, CSpinner, CWidgetSimple } from '@coreui/react'
import React from 'react'
import { Div } from './styled'
import { WidgetButtonPropType } from './type'

export const WidgetButton = ({
    className,
    buttonTextLarge,
    buttonTextSmall,
    icon,
    iconSize,
    clickHandle,
    isDisabled,
    buttonColor,
    loading
}:WidgetButtonPropType) => {
    return (
        <CWidgetSimple
            className={`mb-0  ${!loading?'pointer shadow ':'bg-light'} h-100 option-box ${className} ${isDisabled?'option-disabled':''} text-${buttonColor}`}
            text={buttonTextLarge}
            header={buttonTextSmall}
            onClick={!loading?clickHandle:()=>{}}
        >
            {loading && <CSpinner grow={true} color={buttonColor} type={'glow'}/>}
            {(icon && !loading) && <CIcon name={icon} height={iconSize||25}/>}
        </CWidgetSimple>
    )
}

export const WidgetBox = () => {
    return (
        <CRow>
            <CCol>
                <Div className={'border'}></Div>
            </CCol>
        </CRow>
    )
}