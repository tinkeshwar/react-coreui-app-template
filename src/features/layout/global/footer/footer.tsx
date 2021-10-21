import { CFooter } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectVersion } from '../../store'
import { Div, Span } from '../../styled'

const GlobalFooter = () => {
    const version = useSelector(selectVersion)
    return (
        <CFooter fixed={false}>
            <Div>
                <Span className={'ml-1'}>&copy; 2021 VidhyaSaga Pvt. Ltd.</Span>
            </Div>
            <Div className={'mfs-auto'}>
                <Span className={'mr-1'}>Version {version}</Span>
            </Div>
        </CFooter>
    )
}

export default GlobalFooter