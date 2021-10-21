import CIcon from '@coreui/icons-react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CSpinner } from '@coreui/react'
import React from 'react'
import { ButtonListPropType, ItemType } from './type'

export const ButtonList = ({
    items,
    buttonText,
    buttonType,
    buttonStyle,
    iconLeft,
    iconRight,
    loading,
    size,
}:ButtonListPropType) => {
    return (
        <CDropdown className={'btn-group'}>
            <CDropdownToggle color={buttonType} size={size} variant={buttonStyle}>
                {loading && <CSpinner grow={true} color={'danger'} type={'glow'} size={size} />}
                {!loading && <>{iconLeft && <CIcon size={'sm'} name={iconLeft}/>} {buttonText || ''} {iconRight && <CIcon size={size} name={iconRight}/>}</>}
            </CDropdownToggle>
            <CDropdownMenu>
                {items.filter((item:ItemType)=>item.visible === true).map((item:ItemType)=><CDropdownItem key={`id-${item.text.replace(' ','-')}`} disabled={item?.disabled || false} onClick={item.handle}>{item.text}</CDropdownItem>)}
            </CDropdownMenu>
        </CDropdown>
    )
}