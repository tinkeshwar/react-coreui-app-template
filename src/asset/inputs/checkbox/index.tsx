import { CFormGroup, CInputCheckbox, CInputGroup, CLabel } from '@coreui/react'
import React, { useState } from 'react'
import { checkboxTypeProp } from './type'

export const Checkbox = ({
    label,
    required,
    items,
    checked,
    inline,
    onValueChange,
    onBoxClick,
    inbutton,
    isDisabled
}: checkboxTypeProp) => {
    const [checkedItem, setCheckedItem] = useState<number[]>(checked || [])
    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (parseInt(event.currentTarget.value)) {
            if (onBoxClick) {
                return onBoxClick(parseInt(event.currentTarget.value))
            }
        }
    }
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            checkedItem.push(parseInt(event.currentTarget.value))
            setCheckedItem(checkedItem)
            const newArray = checkedItem
            if (onValueChange) {
                return onValueChange(newArray)
            }
        } else {
            const newArray = checkedItem.filter(item => (item !== parseInt(event.currentTarget.value)))
            setCheckedItem(newArray)
            if (onValueChange) {
                return onValueChange(newArray)
            }
        }
    }

    return (
        <>
            {label && <CLabel className={required ? 'required-class font-weight-bolder' : 'font-weight-bolder'}>{label}</CLabel>}
            {!inline && <CFormGroup>
                {items.map((item) => {
                    return (
                        <CFormGroup variant={'checkbox'} className={inbutton} key={`checkbox-list-${item.id}`}>
                            <CInputCheckbox
                                disabled={isDisabled?.includes((typeof item.id === 'number') ? item.id : parseInt(item.id)) ? true : false}
                                id={`checkbox-${item.id}`}
                                checked={checked?.includes((typeof item.id === 'number') ? item.id : parseInt(item.id))}
                                value={item.id}
                                onChange={(isDisabled !== undefined && isDisabled?.length > 0 && isDisabled.includes((typeof item.id === 'number') ? item.id : parseInt(item.id))) ? () => { } : handleChange}
                                onClick={handleClick} />
                            <CLabel htmlFor={`checkbox-${item.id}`} variant={'checkbox'} className={'form-check-label'} >{item.title}</CLabel>
                        </CFormGroup>
                    )
                })}
            </CFormGroup>}
            {inline && <CInputGroup>
                {items.map(item => {
                    return (
                        <CFormGroup variant={'checkbox'} className={inbutton} inline key={`checkbox-list-${item.id}`}>
                            <CInputCheckbox
                                disabled={isDisabled?.includes((typeof item.id === 'number') ? item.id : parseInt(item.id)) ? true : false}
                                id={`checkbox-${item.id}`}
                                checked={checked?.includes((typeof item.id === 'number') ? item.id : parseInt(item.id))}
                                value={item.id}
                                onChange={(isDisabled !== undefined && isDisabled?.length > 0 && isDisabled.includes((typeof item.id === 'number') ? item.id : parseInt(item.id))) ? () => { } : handleChange}
                                onClick={handleClick} />
                            <CLabel htmlFor={`checkbox-${item.id}`} variant={'checkbox'} className={'form-check-label'} >{item.title}</CLabel>
                        </CFormGroup>
                    )
                })}
            </CInputGroup>}
        </>
    )
}