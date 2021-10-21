import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import { Button } from '../../../asset'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserLoginLog, selectCurrentLog, selectLoading, selectLoginLog, setLoading } from '../store'
import { UserLoginHistoryResponseType } from '../type'
import { Div, ULSpan } from '../styled'
import dateFormat from 'dateformat'
import { removeWithConfirmation } from '../helper'

const MySettings = () => {

    const dispatch = useDispatch()

    const loading: boolean = useSelector(selectLoading)
    const log: UserLoginHistoryResponseType[] = useSelector(selectLoginLog)
    const current: string = useSelector(selectCurrentLog)

    const removeSession = async (id?: string) => {
        const all = id ? undefined:true
        dispatch(setLoading(true))
        removeWithConfirmation(
            ()=>dispatch(loadUserLoginLog(id, all)),
            ()=>{}
        )
        dispatch(setLoading(false))
    }

    useEffect(()=>{
        dispatch(loadUserLoginLog())
    },[dispatch])

    return (
        <CCard className={'h-100'}>
            <CCardHeader color={'danger'} className={'text-white'}>Login Log</CCardHeader>
            <CCardBody className={'pb-0'}>
                {log && log.map((data: UserLoginHistoryResponseType, index: number)=> {
                    return (
                        <CRow key={`log-${index}`}>
                            <CCol md={12}>
                                <Div className={'border p-2 mt-1'}>
                                    <ULSpan size={12} bold={600} color={'red'}>IP: {data.user_agent.ip}</ULSpan>
                                    <ULSpan size={12} bold={600} color={'blue'}>Browser: {data.user_agent.agent}</ULSpan>
                                    <ULSpan size={12} bold={600} color={'green'}>Device OS: {data.user_agent.os}</ULSpan>
                                    <ULSpan size={12} bold={600} color={'purple'}>Device ID: {data.user_agent.device_id}</ULSpan>
                                    <ULSpan size={12} bold={600} color={'black'}>Last Login: {dateFormat(data.updated_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</ULSpan>
                                    <ULSpan className={'border-0'} size={12} bold={600} color={'red'} align={'right'}>
                                        <Button buttonType={'link'} disabled={current === data.id} buttonText={current === data.id ? 'Current':'Remove'} onClick={()=>removeSession(data.id)}/>
                                    </ULSpan>
                                </Div>
                            </CCol>
                        </CRow>
                    )
                })}
            </CCardBody>
            <CCardFooter className={'text-right'}>
                <Button
                    buttonType={'danger'}
                    buttonText={'Remove All'}
                    loading={loading}
                    onClick={()=>removeSession()}
                    disabled={log.length === 1}
                />
            </CCardFooter>
        </CCard>
    )
}

export default MySettings