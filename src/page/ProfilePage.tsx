import React, { Suspense } from 'react'
import { useParams } from 'react-router'
import { UserProfile, UserSettings } from '../features/auth'
import { GlobalLayout, LoaderFour } from '../features/layout'

const ProfilePage = () => {

    const { type } = useParams() as any

    return (
        <Suspense fallback={<LoaderFour/>}>
            <GlobalLayout>
                {!type && <UserProfile/>}
                {type === 'settings' && <UserSettings/>}
            </GlobalLayout>
        </Suspense>
    )
}

export default ProfilePage