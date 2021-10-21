import { Autocomplete } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { TextInput } from '..'
import { TextInputPropType } from '../inputs/input/type'
import { AutoCompleteTypeProp } from './type'


export const AutoComplete = ({
    clear,
    onPlaceChange,
    ...option
}:AutoCompleteTypeProp&TextInputPropType) => {
    const [autocomplete , setAutoComplete] = useState<any>('')
    const [place, setPlace] = useState('')

    const handlePlaceChange = () => {
        const place = autocomplete.getPlace()
        if(place){
            return onPlaceChange(place)
        }
        return null
    }

    useEffect(()=>{
        if(clear){
            setPlace('')
        }
    },[clear])

    return (
        <Autocomplete
        onLoad={(auto)=>setAutoComplete(auto)}
        onPlaceChanged={handlePlaceChange}
        >
            <TextInput value={place} onValueChange={setPlace} {...option}/>
        </Autocomplete>
    )
}