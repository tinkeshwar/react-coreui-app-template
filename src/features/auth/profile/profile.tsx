import React, { useEffect } from 'react'
import { CCol, CRow } from '@coreui/react'
import MyProfile from './myprofile'
import { loadUserProfile } from '../store'
import { useDispatch } from 'react-redux'
import MyPassword from './mypassword'

const UserProfile = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadUserProfile())
    },[dispatch])
    return(
        <CRow>
            <CCol md={6}><MyProfile/></CCol>
            <CCol md={6}><MyPassword/></CCol>
        </CRow>
    )
}

export default UserProfile