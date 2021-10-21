import React, { Suspense } from 'react'
import { AdminBoard } from '../features/dashboard'
import { GlobalLayout, LoaderFour } from '../features/layout'

const DashboardPage = () => {
    return (
        <Suspense fallback={<LoaderFour/>}>
            <GlobalLayout>
                <AdminBoard/>
            </GlobalLayout>
        </Suspense>
    )
}

export default DashboardPage