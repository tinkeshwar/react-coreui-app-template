import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarMinimizer,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CSidebarNavTitle
} from '@coreui/react'
import React, {  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLayout } from '../../../auth'
import { selectGlobalSidebar, selectSidebar, setGlobalSidebar } from '../../store'
import { Span } from '../../styled'
import { GlobalSidebarShowType } from '../../type'
import itemsListArray from './items'
import logo from '../../../../asset/static/logo-long.svg'
import logoShort from '../../../../asset/static/logo-short.svg'
import styled from 'styled-components'

const Img = styled.img``

const GlobalSidebarMenu = () => {

    const dispatch = useDispatch()
    const sidebar: GlobalSidebarShowType = useSelector(selectGlobalSidebar)
    const side = useSelector(selectSidebar)

    const sidemenu = (val: any) => {
        dispatch(setGlobalSidebar({type: 'set', sidebarShow: val}))
    }

    return (
        <>
            <CSidebar
                show={sidebar.sidebarShow}
                onShowChange={(val: boolean) => sidemenu(val)}
                >
                <CSidebarBrand className={'d-md-down-none'}>
                    <Span className={'c-sidebar-brand-full'}><Img src={logo} height={35}/></Span>
                    <Span className={'c-sidebar-brand-minimized'}><Img src={logoShort} height={35}/></Span>
                </CSidebarBrand>

                <CSidebarNav>
                    {itemsListArray.length >0 &&<CCreateElement
                        items={side}
                        components={{
                            CSidebarNavDivider,
                            CSidebarNavDropdown,
                            CSidebarNavItem,
                            CSidebarNavTitle
                        }}
                    />}
                </CSidebarNav>

                <CSidebarMinimizer className={'c-d-md-down-none'}/>
            </CSidebar>
        </>
    )
}
const GlobalSidebar = authLayout(GlobalSidebarMenu)
export default GlobalSidebar
