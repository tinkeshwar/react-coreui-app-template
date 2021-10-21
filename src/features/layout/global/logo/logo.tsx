import { CCol, CRow } from '@coreui/react'
import React from 'react'
import { ImageDisplay } from '../../../../asset'
import logo from '../../../../asset/static/logo-long.svg'

const Logo = ({url, className}:{url?:string,className?: string}) => {
    return (
        <CRow>
            <CCol className={className}>
                <ImageDisplay src={url || logo}/>
            </CCol>
        </CRow>
    )
}

export default Logo