import { useParams } from 'react-router-dom'
import React, { Suspense } from 'react'

import { GlobalLayout, LoaderFour } from '../features/layout'
import { PermissionList, RoleList, UserList } from '../features/user'

const UserPage = () => {
    const { type } = useParams() as any
    return (
        <Suspense fallback={<LoaderFour/>}>
            <GlobalLayout>
                {type === 'users' && <UserList/>}
                {type === 'roles' && <RoleList/>}
                {type === 'permissions' && <PermissionList/>}
            </GlobalLayout>
        </Suspense>
    )
}

export default UserPage