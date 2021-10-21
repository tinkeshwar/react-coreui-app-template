import { CHeader, CHeaderNav, CHeaderNavItem, CHeaderNavLink, CToggler } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectGlobalSidebar, setGlobalSidebar } from '../../store'
import { Span } from '../../styled'
import { GlobalSidebarShowType } from '../../type'
import UserMenu from './usermenu'
import logo from '../../../../asset/static/logo-long.svg'

const Img = styled.img``
const GlobalHeader = () => {

    const dispatch = useDispatch()
    const sidebar:GlobalSidebarShowType = useSelector(selectGlobalSidebar)

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebar.sidebarShow) ? true : 'responsive'
        dispatch(setGlobalSidebar({type: 'set', sidebarShow: val}))
    }

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebar.sidebarShow) ? false : 'responsive'
        dispatch(setGlobalSidebar({type: 'set', sidebarShow: val}))
    }

    return (
        <CHeader withSubheader>
            <CToggler inHeader className={'ml-md-3 d-lg-none'} onClick={toggleSidebarMobile}/>
            <CToggler inHeader className={'ml-3 d-md-down-none'} onClick={toggleSidebar}/>

            <CHeaderNav className={'d-md-down-none mr-auto'}>
                <CHeaderNavItem className={'px-3'} >
                    <CHeaderNavLink>{'Dashboard'}</CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem  className={'px-3'}>
                    <CHeaderNavLink>{'Users'}</CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className={'px-3 m-auto d-md-none'}>
                <Span className={'c-sidebar-brand-full'}><Img src={logo} height={35}/></Span>
            </CHeaderNav>
            <CHeaderNav className={'px-3'}>
                <UserMenu/>
            </CHeaderNav>

        </CHeader>
    )
}

export default GlobalHeader