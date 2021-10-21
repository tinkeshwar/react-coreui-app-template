import { DropdownItemType, MetaType, PermissionListCustomType, PermissionResponseType, RoleListCustomType, RoleResponseType, UserListCustomType, UserResponseType } from '../type'

/* start total pages */
export const getTotalPages = (meta: MetaType|undefined) => {
    return (meta !== undefined) ? Math.ceil(meta.total/meta.per_page)||1:1
}
/* end total pages */

/* start user list */
export const getUsersForList = (users: UserResponseType[]) => {
    return users?.map((user: UserResponseType) => {
        return {
            Id:user.id,
            Name:`${user.firstname} ${user.middlename || ''} ${user.lastname || ''}`,
            Email:user.email,
            Phone:user.phone,
            Status:(user.status ? 'Active':'Not Active'),
        } as UserListCustomType
    })
}
/* end user list */

/* start role list */
export const getRolesForList = (roles: RoleResponseType[]) => {
    return roles?.map((role: RoleResponseType) => {
        return {
            Id:role.id,
            Name:role.name,
            Description:role.description,
            Status:(role.status ? 'Active':'Not Active')
        } as RoleListCustomType
    })
}
/* end role list */

/* start permission list */
export const getPermissionsForList = (permissions: PermissionResponseType[]) => {
    return permissions?.map((permission: PermissionResponseType) => {
        return {
            Id:permission.id,
            Name:permission.name,
            Level:permission.level,
            Status:permission.status?'Active':'Not Active'
        } as PermissionListCustomType
    })
}

export const getPermissionsForDropdown = (permissions: PermissionResponseType[]) => {
    return permissions?.map((permission: PermissionResponseType) => {
        return {
            id:permission.id,
            title:permission.name
        } as DropdownItemType
    })
}

export const getRolesForDropdown = (roles: RoleResponseType[]) => {
    return roles?.map((role: RoleResponseType) => {
        return {
            id:role.id,
            title:role.name
        } as DropdownItemType
    })
}

export const getFormattedPermissions = (permissions:DropdownItemType[])=>{
    let newList = [] as any
    permissions.forEach((permission: DropdownItemType) => {
        const permissionSplit: any = permission.title.split('.')
        if(permissionSplit[0] in newList){
            newList[permissionSplit[0]].push({id: permission.id, title: permissionSplit[1]})
        }else{
            newList[permissionSplit[0]] = [{id: permission.id, title: permissionSplit[1]}]
        }
    })
    let data = [] as any
    for(let key in newList){
        data.push({label: key,group: newList[key]})
    }
    return data
}

export const getPillColor = (text: string) => {
    switch (text) {
        case 'list':
            return 'primary'
        case 'create':
            return 'success'
        case 'show':
            return 'info'
        case 'update':
            return 'warning'
        case 'destroy':
            return 'danger'
        case 'status':
            return 'dark'
        default:
            return 'primary'
    }
}
/* end permission list */
