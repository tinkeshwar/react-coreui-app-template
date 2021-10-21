import RestApiService from '../../service/RestApiService'

/* start sign in */
export const signIn = async (data:object) => {
    const path = 'auth/user/login'
    return await RestApiService.post(path, data)
}
/* end sign in */

/* start sign out */
export const signOut = async () => {
    const path = 'auth/user/logout'
    return await RestApiService.get(path)
}
/* start sign out */

// Start Password Forget
export const passwordForget = async (data: object) => {
    const path = 'auth/user/forget-password'
    return await RestApiService.post(path, data)
}
// End Password Forget

// Password Reset API Start
export const passwordRest = async (data: object) => {
    const path = 'auth/user/reset-password'
    return await RestApiService.post(path, data)
}
// Password Reset API End

/* start get user profile */
export const getProfile = async () => {
    const path = 'auth/profile/profile'
    return await RestApiService.get(path)
}

export const getLoginLog = async (id?: string, clear?: boolean) => {
    const path = `auth/profile/login-history?id=${id}&clear=${clear}`
    return await RestApiService.get(path)
}

export const uploadUserImage = async (data: any) => {
    const path = 'common/upload/image'
    return await RestApiService.upload(path, data)
}

export const updateUser = async (data: any) => {
    const path = 'auth/profile/change-profile'
    return await RestApiService.post(path, data)
}
export const updatePassword = async (data: any) => {
    const path = 'auth/profile/change-password'
    return await RestApiService.post(path, data)
}
/* end get user profile */