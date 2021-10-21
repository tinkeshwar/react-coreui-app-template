import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CWidgetBrand, CWidgetIcon } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCPU, selectCpu } from '../store'
import { CPUStateResponseType } from '../type'
import { Line } from 'react-chartjs-2'
import { dashOneCPUdata, getCPUUsage, getUptime } from '../helper'
import { Button } from '../../../asset'
import CIcon from '@coreui/icons-react'

const AdminBoard = () => {

    const dispatch = useDispatch()
    const cpu: CPUStateResponseType[] = useSelector(selectCpu)

    const handleRefresh = () => {
        dispatch(loadCPU(cpu.map(c => c)))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(loadCPU(cpu.map(c => c)))
        }, 60000)
        return () => { clearInterval(interval) }
    }, [cpu, dispatch])

    return (
        <CContainer>
            <CRow>
                <CCol sm={'6'} lg={'3'}>
                    <CWidgetBrand color={'facebook'} rightHeader={'0'}
                        rightFooter={'Registrations'} leftHeader={'0'} leftFooter={'Admissions'}
                    >
                        <CIcon name={'cilBank'} height={'56'} className={'my-4'} />
                    </CWidgetBrand>
                </CCol>
                <CCol sm={'6'} lg={'3'}>
                    <CWidgetBrand color={'linkedin'} rightHeader={'0'}
                        rightFooter={'Fee Collected'} leftHeader={'0'} leftFooter={'Fee Pending'}
                    >
                        <CIcon name={'cilMoney'} height={'56'} className={'my-4'} />
                    </CWidgetBrand>
                </CCol>
                <CCol sm={'6'} lg={'3'}>
                    <CWidgetBrand color={'twitter'} rightHeader={'0'}
                        rightFooter={'Boys'} leftHeader={'0'} leftFooter={'Girls'}
                    >
                        <CIcon name={'cilWc'} height={'56'} className={'my-4'} />
                    </CWidgetBrand>
                </CCol>
                <CCol sm={'6'} lg={'3'}>
                    <CWidgetBrand rightHeader={'0'} rightFooter={'Teaching'}
                        leftHeader={'0'} leftFooter={'Non-Teaching'} color={'gradient-info'}
                    >
                        <CIcon name={'cilSchool'} height={'56'} className={'my-4'} />
                    </CWidgetBrand>
                </CCol>
            </CRow>
            <CRow>
                <CCol md={6} className={'mb-3'}>
                    <CCard className={'h-100'}>
                        <CCardHeader>
                            {'Server Performance Graph'}
                            <Button buttonText={'Refresh'} className={'float-right btn-sm'} buttonType={'link'} onClick={handleRefresh} />
                        </CCardHeader>
                        <CCardBody>
                            <Line data={dashOneCPUdata(cpu)} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={3} className={'mb-3'}>
                    <CCard className={'h-100'}>
                        <CCardHeader>
                            {'Server Uptime'}
                            <Button buttonText={'Refresh'} className={'float-right btn-sm'} buttonType={'link'} onClick={handleRefresh} />
                        </CCardHeader>
                        <CCardBody className={'text-center'}>
                            <CWidgetIcon className={'mb-1'} text={'Server Uptime'} header={`${getUptime(cpu)} Hr`} color={'primary'} iconPadding={false}>
                                <CIcon width={25} name={'cil-settings'} />
                            </CWidgetIcon>
                            <CWidgetIcon className={'mb-1'} text={'CPU Usage'} header={`${getCPUUsage(cpu)} %`} color={'info'} iconPadding={false}>
                                <CIcon width={25} name={'cil-speedometer'} />
                            </CWidgetIcon>
                            <CWidgetIcon className={'mb-1'} text={'Memory Usage'} header={`${getCPUUsage(cpu, 'memory')} MB`} color={'dark'} iconPadding={false}>
                                <CIcon width={25} name={'cilMemory'} />
                            </CWidgetIcon>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={3} className={'mb-3'}>
                    <CCard className={'h-100'}>
                        <CCardHeader>
                            {'Server Log'}
                            <Button buttonText={'Refresh'} className={'float-right btn-sm'} buttonType={'link'} onClick={handleRefresh} />
                        </CCardHeader>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default AdminBoard