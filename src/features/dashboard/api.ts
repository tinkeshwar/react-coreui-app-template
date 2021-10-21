import RestApiService from '../../service/RestApiService'

/* start cpu state in */
export const getCPU = async () => {
    const path = 'server-state'
    return await RestApiService.get(path)
}
/* end cpu state in */