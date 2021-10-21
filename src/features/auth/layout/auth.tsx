import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loadRefresh, selectAuthProfile, selectIsLoggedIn } from '../store'
import { LoaderTwo } from '../../layout'
import { UserProvider } from '../../../app/context'

const authLayout = (Component: React.ComponentType<any>) => (props: any) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const profile = useSelector(selectAuthProfile)

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(loadRefresh())
        }
        setLoading(false)
    },[dispatch, isLoggedIn])

    if (isLoggedIn || loading) return <UserProvider value={profile}><Component {...props}/></UserProvider>
    return (<LoaderTwo location={'/'} timer={2000}/>)
}

export default authLayout