import CIcon from '@coreui/icons-react'
import { CInputGroupPrepend, CInputGroupText, CInput, CLabel, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CInputGroup, CInputGroupAppend } from '@coreui/react'
import React, { useState } from 'react'
import { DropdownPropType, DropdownItemType } from './type'

export const Dropdown = ({
    onSelect,
    items,
    label,
    searchTitle,
    title,
    disabled,
    required,
    leftIcon,
    leftText,
    rightIcon,
    rightText,
}: DropdownPropType) => {

    const Item = ({title, onClick}: DropdownItemType & { onClick: () => any }) => {
        return (
            <CDropdownItem onClick={onClick}>{title}</CDropdownItem>
        )
    }

    const [searchValue, setSearchValue] = useState('')

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const itemSearchFilter = (item: DropdownItemType) => item.title.toLowerCase().includes(searchValue.toLowerCase())

    return (
        <>
            {label && <CLabel className={required?'required-class font-weight-bolder':'font-weight-bolder'}>{label}</CLabel>}
                <CDropdown className={'w-100'}>
                    <CDropdownToggle color={'secondary'} className={'d-block w-100 p-0 custom-dd-input text-left bg-white h6 mb-0'}>
                    <CInputGroup>
                        {(leftIcon || leftText) && <CInputGroupPrepend>
                            <CInputGroupText className={(required && !label)?'required-class font-weight-bolder':' font-weight-bolder'}>
                                {leftIcon && <CIcon name={leftIcon} />}
                                {leftText && <>{leftText}</>}
                            </CInputGroupText>
                        </CInputGroupPrepend>}
                            <CInput value={title} disabled={true} className={'bg-white'}/>
                        {(rightIcon || rightText) &&<CInputGroupAppend>
                            {(rightIcon || rightText) && <CInputGroupText className={'font-weight-bolder'}>
                                {rightIcon && <CIcon name={rightIcon} />}
                                {rightText && <CInputGroupText>{rightText}</CInputGroupText>}
                            </CInputGroupText>}
                        </CInputGroupAppend>}
                    </CInputGroup>
                    </CDropdownToggle>
                    {<CDropdownMenu className={'p-0'}>
                        {!!searchTitle && <CInputGroup className={'px-1 py-1'}>
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name={'cil-search'}/>
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder={searchTitle}
                            />
                        </CInputGroup>}
                        {(items !== undefined && !disabled) && items.filter(itemSearchFilter).map(item =>
                            <Item key={item.id} onClick={() => onSelect(item)} {...item}/>
                        )}
                    </CDropdownMenu>}
                </CDropdown>
        </>
    )
}