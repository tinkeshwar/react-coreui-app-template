import RestApiService from '../../service/RestApiService'

// User API start.

export const getUsers = async (page: number, records: number) => {
    const path = `user/users?page=${page}&records=${records}`
    return await RestApiService.get(path)
}

export const changeUserStatus = async (id:number) => {
    const path = `user/users/${id}`
    return await RestApiService.patch(path)
}

export const createNewUser = async (data: any) => {
    const path = 'user/users'
    return await RestApiService.post(path, data)
}

export const getSelectedUser = async (id: number) => {
    const path = `user/users/${id}`
    return await RestApiService.get(path)
}

export const patchSelectedUser = async (id: number, data: any) => {
    const path = `user/users/${id}`
    return await RestApiService.put(path, data)
}

export const deleteSelectedUser = async (id: number) => {
    const path = `user/users/${id}`
    return await RestApiService.destroy(path)
}

export const uploadUserImage = async (data: any) => {
    const path = 'common/upload/image'
    return await RestApiService.upload(path, data)
}

export const patchSelectedUserRole = async (id: number, data: any) => {
    const path = `user/users/${id}/roles`
    return await RestApiService.put(path, data)
}

export const toggleUserRole = async (id: number, data: any) => {
    const path = `user/users/${id}/role`
    return await RestApiService.put(path, data)
}

export const patchSelectedUserPermission = async (id: number, data: any) => {
    const path = `user/users/${id}/permissions`
    return await RestApiService.put(path, data)
}

export const toggleUserPermission = async (id: number, data: any) => {
    const path = `user/users/${id}/permission`
    return await RestApiService.put(path, data)
}
// User API end.

// Role API start.

export const getRoles = async (page: number, records: number) => {
    const path = `user/roles?page=${page}&records=${records}`
    return await RestApiService.get(path)
}

export const getRoleDropdownItems = async (sort?: string, order?: string) => {
    const path = `user/roles/dropdown?sort=${sort}&order=${order}`
    return await RestApiService.get(path)
}

export const changeRoleStatus = async (id: number) => {
    const path = `user/roles/${id}`
    return await RestApiService.patch(path)
}

export const createNewRole = async (data: any) => {
    const path = 'user/roles'
    return await RestApiService.post(path, data)
}

export const getSelectedRole = async (id: number) => {
    const path = `user/roles/${id}`
    return await RestApiService.get(path)
}

export const patchSelectedRole = async (id: number, data: any) => {
    const path = `user/roles/${id}`
    return await RestApiService.put(path, data)
}

export const deleteSelectedRole = async (id: number) => {
    const path = `user/roles/${id}`
    return await RestApiService.destroy(path)
}

export const patchSelectedRolePermission = async (id: number, data: any) => {
    const path = `user/roles/${id}/permissions`
    return await RestApiService.put(path, data)
}

export const toggleRolePermission = async (id: number, data: any) => {
    const path = `user/roles/${id}/permission`
    return await RestApiService.put(path, data)
}

// Role API end.

// Permission API start.

export const getPermissions = async (page: number, records: number) => {
    const path = `user/permissions?page=${page}&records=${records}`
    return await RestApiService.get(path)
}

export const getPermissionDropdownItems = async (sort?: string, order?: string) => {
    const path = `user/permissions/dropdown?sort=${sort}&order=${order}`
    return await RestApiService.get(path)
}

export const changePermissionStatus = async (id: number) => {
    const path = `user/permissions/${id}`
    return await RestApiService.patch(path)
}

export const createNewPermission = async (data: any) => {
    const path = 'user/permissions'
    return await RestApiService.post(path, data)
}

export const getSelectedPermission = async (id: number) => {
    const path = `user/permissions/${id}`
    return await RestApiService.get(path)
}

export const patchSelectedPermission = async (id: number, data: any) => {
    const path = `user/permissions/${id}`
    return await RestApiService.put(path, data)
}

export const deleteSelectedPermission = async (id: number) => {
    const path = `user/permissions/${id}`
    return await RestApiService.destroy(path)
}

// Permission API end.