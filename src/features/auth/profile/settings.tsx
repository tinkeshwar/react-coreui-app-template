import React, { useEffect } from 'react'
import { CCol, CRow } from '@coreui/react'
import { loadUserProfile } from '../store'
import { useDispatch } from 'react-redux'
import MySettings from './mysettings'

const UserSettings = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadUserProfile())
    },[dispatch])
    return(
        <CRow>
            <CCol md={6}><MySettings/></CCol>
        </CRow>
    )
}

export default UserSettings