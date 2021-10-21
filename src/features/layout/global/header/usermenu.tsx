import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Div, Strong } from '../../styled'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../store'
import { createImage, logoutWithConfirmation } from '../../helper'
import { useHistory } from 'react-router-dom'
import { AuthUserProfileResponseType } from '../../type'

const UserMenu = () => {

    const history = useHistory()
    const user: AuthUserProfileResponseType = useSelector(selectUserProfile)

    const clickMe = (link: string) => {
        history.push(link)
    }

    const logoutHandle = () => {
        logoutWithConfirmation(
            async () => {
                history.push('/logout')
            },
            () => {}
        )
    }

    return (
        <>
        {user !== undefined && <CDropdown inNav className={'c-header-nav-items mx-2'}>
            <CDropdownToggle className={'c-header-nav-link'} caret={false}>
                <Div className={'c-avatar'}>
                    <CImg src={createImage(user?.image?.public_url)} className={'c-avatar-img'} alt={'vidhyasaga.com'}/>
                </Div>
            </CDropdownToggle>
            <CDropdownMenu className={'pt-0'} placement={'bottom-end'}>
                <CDropdownItem header tag={'div'} color={'light'} className={'text-center'}>
                    <Strong>{`${user.firstname} ${user.lastname}`}</Strong>
                </CDropdownItem>

                <CDropdownItem>
                    <CIcon name={'cil-envelope-open'} className={'mfe-2'} />{'Notifications'}
                    <CBadge color={'success'} className={'mfs-auto'}>42</CBadge>
                </CDropdownItem>

                <CDropdownItem onClick={()=>clickMe('/profile')}>
                    <CIcon name={'cil-user'} className={'mfe-2'}/>{'Profile'}
                </CDropdownItem>

                <CDropdownItem onClick={()=>clickMe('/profile/settings')}>
                    <CIcon name={'cil-settings'} className={'mfe-2'} />{'Settings'}
                </CDropdownItem>

                <CDropdownItem divider />
                <CDropdownItem onClick={logoutHandle}>
                    <CIcon name={'cil-lock-locked'} className={'mfe-2'} />{'Sign Out'}
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>}
        </>
    )
}

export default UserMenu
