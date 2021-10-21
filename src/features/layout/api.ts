import RestApiService from '../../service/RestApiService'

/* start get user profile */
export const getProfile = async () => {
    const path = 'auth/profile/profile'
    return await RestApiService.get(path)
}
/* end get user profile */