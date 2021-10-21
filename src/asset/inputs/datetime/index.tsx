import CIcon from '@coreui/icons-react'
import { CInputGroupPrepend, CInputGroupText, CInput, CInputGroupAppend, CInvalidFeedback, CLabel, CInputGroup } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getTimeZoneString, handleDateInput, handleTimeInput, handleTwoDigitYears, validateDate, validateTime } from './helper'
import { DateTimeInputPropType } from './type'

export const DateTime = ({
    value,
    onValueChange,
    label,
    showTimeInput,
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
}: DateTimeInputPropType) => {

    const [dateInputValue, setDateInputValue] = useState(handleDateInput(value))
    const [timeInputValue, setTimeInputValue] = useState(handleTimeInput(value))
    const [errorMessage, setErrorMessage] = useState('')

    const timeZoneString = getTimeZoneString((new Date()).getTimezoneOffset())

    const onDateValueChange = (formattedDate: string|null) => {
        if (onValueChange) {
            return onValueChange(formattedDate)
        }

        throw new Error('Provide either onChange or onValueChange to Input component.')
    }

    // onChange event handlers start

    const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value

        if (value === null || value === undefined || value === '') {
            setDateInputValue('')
        }
        else {
            setDateInputValue(value.replace(/\D/, ''))
        }
    }

    const handleTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value

        if (value === null || value === undefined || value === '') {
            setTimeInputValue('')
        }
        else {
            setTimeInputValue(value.replace(/\D/, ''))
        }
    }

    // onChange event handlers end

    // onFocus event handlers start

    const handleDateOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {

        setErrorMessage('')

        const dateValue = event.target.value

        if (dateValue === null || dateValue === undefined || dateValue === '') {
            return setDateInputValue('')
        }
        else if (dateValue.length === 10) {
            const dateArray = dateValue.split('-')
            setDateInputValue(dateArray[0]+dateArray[1]+dateArray[2])
        }
        else {
            setDateInputValue(dateValue)
        }
    }

    const handleTimeOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {

        setErrorMessage('')

        const timeValue = event.target.value

        if (timeValue === null || timeValue === '' || timeValue === undefined) {
            return setTimeInputValue('')
        }
        else if (timeValue.length === 5) {
            const timeArray = timeValue.split(':')
            setTimeInputValue(timeArray[0]+timeArray[1])
        }
        else {
            setTimeInputValue(timeValue)
        }
    }

    // onFocus event handlers end

    // onBlur event handlers start

    const handleDateOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = (event.target.value).replace(/\D/g, '')
        let dateValue: string|null = value
        let timeValue = timeInputValue

        if (!!value) {
            if (value.length === 6) {
                const convertedYearEntry = handleTwoDigitYears(value.substr(4,2))
                dateValue = (value.substr(0,2)+'-'+value.substr(2,2)+'-'+convertedYearEntry)
            }
            else if (value.length === 8) {
                dateValue = (value.substr(0,2)+'-'+value.substr(2,2)+'-'+value.substr(4,4))
            }
            else {
                dateValue = event.target.value
            }
        }
        else {
            dateValue = ''
        }
        setDateInputValue(dateValue)
        return handleDateTime(dateValue, timeValue)
    }

    const handleTimeOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {

        const value = (event.target.value).replace(/\D/g, '')
        let dateValue = dateInputValue
        let timeValue: string|null = value

        if (!!value) {
            if (value.length === 4) {
                timeValue = (value.substr(0,2)+':'+value.substr(2,2))
            }
            else {
                timeValue = event.target.value
            }
        }
        else {
            timeValue = ''
        }
        setTimeInputValue(timeValue)
        return handleDateTime(dateValue, timeValue)
    }

    // onBlur event handlers end

    // Date conversion logic for APIs start

    const handleDateTime = (dateInputValue:string|null, timeInputValue:string|null) => {
        if (showTimeInput) {
            if (!!dateInputValue && !!timeInputValue) {
                if (validateDate(dateInputValue) && validateTime(timeInputValue)) {
                    const dateArray = dateInputValue.split('-')
                    return onDateValueChange(dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0]+'T'+timeInputValue+timeZoneString)
                }
                else if (validateDate(dateInputValue) && !validateTime(timeInputValue)) {
                    const dateArray = dateInputValue.split('-')
                    setErrorMessage('Invalid time entered')
                    return onDateValueChange(dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0]+'T00:00'+timeZoneString)
                }else if (!validateDate(dateInputValue) && validateTime(timeInputValue)) {
                    setErrorMessage('Invalid date entered')
                    return onDateValueChange(null)
                }else {
                    setErrorMessage('Invalid date/time entered')
                    return onDateValueChange(null)
                }
            }
            else if (!!dateInputValue && !timeInputValue) {
                if (validateDate(dateInputValue)) {
                    const dateArray = dateInputValue.split('-')
                    return onDateValueChange(dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0]+'T00:00'+timeZoneString)
                }
                else {
                    setErrorMessage('Invalid date entered.')
                    return onDateValueChange(null)
                }
            }
            else if (!dateInputValue && !!timeInputValue) {
                setErrorMessage('Please provide a date.')
                return onDateValueChange(null)
            }
            else {
                setErrorMessage('Please provide a date.')
                return onDateValueChange(null)
            }
        }
        else {
            if (!!dateInputValue) {
                if (validateDate(dateInputValue)) {
                    const dateArray = dateInputValue.split('-')
                    return onDateValueChange(dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0])
                }
                else {
                    setErrorMessage('Invalid date entered.')
                    return onDateValueChange(null)
                }
            }
            else {
                setErrorMessage('Please provide a date.')
                return onDateValueChange(null)
            }
        }
    }

    // Date conversion logic for APIs ends


    // Update input logic begin

    useEffect(()=>{
        setDateInputValue(handleDateInput(value))
        setTimeInputValue(handleTimeInput(value))
    }, [value])

    // Update input logic end

    return (
        <>
        {label && <CLabel className={required?'required-class font-weight-bolder':'font-weight-bolder'}>{label}</CLabel>}
        <CInputGroup>
            {(leftIcon || leftText) &&<CInputGroupPrepend>
                <CInputGroupText className={(required && !label)?'required-class':''}>
                    {leftIcon && <CIcon name={leftIcon || 'cil-calendar'} />}
                    {leftText && <>{leftText}</>}
                </CInputGroupText>
            </CInputGroupPrepend>}
            <CInput
                value={dateInputValue || undefined || ''}
                type={'text'}
                placeholder={ placeholder || 'Enter Here..'}
                autoComplete={autocomplete || 'none'}
                onChange={handleDateOnChange}
                onBlur={handleDateOnBlur}
                onFocus={handleDateOnFocus}
                invalid={(error || errorMessage)? true : false}
                size={size}
                className={className}
            />
            {showTimeInput && <CInput
                value={timeInputValue || undefined || ''}
                type={'text'}
                placeholder={'hh:mm'}
                onChange={handleTimeOnChange}
                onBlur={handleTimeOnBlur}
                onFocus={handleTimeOnFocus}
                invalid={(error || errorMessage)? true : false}
                size={size}
                className={className}
            />}
            {error && <CInvalidFeedback>{error}</CInvalidFeedback>}
            {(errorMessage && error === undefined) && <CInvalidFeedback>{errorMessage}</CInvalidFeedback>}
            {(rightIcon ||rightText)&&<CInputGroupAppend>
                <CInputGroupText>
                    {rightIcon && <CIcon name={rightIcon || 'cil-clock'} />}
                    {rightText && <CInputGroupText>{rightText}</CInputGroupText>}
                </CInputGroupText>
            </CInputGroupAppend>}
        </CInputGroup>
        </>
    )
}