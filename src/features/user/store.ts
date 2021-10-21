import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPermissionDropdownItems, getPermissions, getRoleDropdownItems, getRoles, getSelectedPermission, getSelectedRole, getSelectedUser, getUsers } from './api'
import { getPermissionsForDropdown, getRolesForDropdown } from './helper'
import { DropdownItemType, MetaType, PermissionListResponseType, PermissionResponseType, RoleListResponseType, RoleResponseType, UserListResponseType, UserResponseType } from './type'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        /*start common*/
        loading:false as boolean,
        meta: {} as MetaType,
        /*end common*/

        /*start user*/
        selectedUserPage: 1 as number,
        users: [] as UserResponseType[],
        selectedUser: {} as UserResponseType,
        /*end user*/

        /*start role*/
        selectedRolePage: 1 as number,
        roles: [] as RoleResponseType[],
        selectedRole: {} as RoleResponseType,
        roleDropdownItems: [] as DropdownItemType[],
        /*end role*/

        /*start permission*/
        selectedPermissionPage: 1 as number,
        permissions: [] as PermissionResponseType[],
        selectedPermission: {} as PermissionResponseType,
        permissionDropdownItems: [] as DropdownItemType[]
        /*end permission*/
    },
    reducers:{
        /*start common*/
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setMeta: (state, action:PayloadAction<MetaType>) => {
            state.meta = action.payload
        },
        /*end common*/

        /*start user*/
        setSelectedUserPage: (state, action:PayloadAction<number>) => {
            state.selectedUserPage = action.payload
        },
        setUsers: (state, action:PayloadAction<UserResponseType[]>) => {
            state.users = action.payload
        },
        setSelectedUser: (state, action:PayloadAction<UserResponseType>) => {
            state.selectedUser = action.payload
        },
        /*end user*/

        /*start role*/
        setSelectedRolePage: (state, action:PayloadAction<number>) => {
            state.selectedRolePage = action.payload
        },
        setRoles: (state, action:PayloadAction<RoleResponseType[]>) => {
            state.roles = action.payload
        },
        setSelectedRole: (state, action:PayloadAction<RoleResponseType>) => {
            state.selectedRole = action.payload
        },
        setRoleDropdownItems: (state, action:PayloadAction<DropdownItemType[]>) => {
            state.roleDropdownItems = action.payload
        },
        /*end role*/

        /*start permission*/
        setSelectedPermissionPage: (state, action:PayloadAction<number>) => {
            state.selectedPermissionPage = action.payload
        },
        setPermissions: (state, action:PayloadAction<PermissionResponseType[]>) => {
            state.permissions = action.payload
        },
        setSelectedPermission: (state, action:PayloadAction<PermissionResponseType>) => {
            state.selectedPermission = action.payload
        },
        setPermissionDropdownItems: (state, action:PayloadAction<DropdownItemType[]>) => {
            state.permissionDropdownItems = action.payload
        }
        /*end permission*/
   }
})

export const {
    /*start common*/
    setLoading,
    setMeta,
    /*end common*/

    /*start user*/
    setSelectedUserPage,
    setUsers,
    setSelectedUser,
    /*end user*/

    /*start role*/
    setSelectedRolePage,
    setRoles,
    setSelectedRole,
    setRoleDropdownItems,
    /*end role*/

    /*start permission*/
    setSelectedPermissionPage,
    setPermissions,
    setSelectedPermission,
    setPermissionDropdownItems
    /*end permission*/

} = UserSlice.actions

/*start common*/

/*end common*/

/*start user*/
export const loadUsers = (page: number, records: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: UserListResponseType = await getUsers(page, records)
    dispatch(setUsers(response.list))
    dispatch(setMeta(response.meta))
    dispatch(setLoading(false))
}

export const loadSelectedUser = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: UserResponseType = await getSelectedUser(id)
    dispatch(setSelectedUser(response))
    dispatch(setLoading(false))
}
/*end user*/

/*start role*/
export const loadRoles = (page: number, records: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: RoleListResponseType = await getRoles(page, records)
    dispatch(setRoles(response.list))
    dispatch(setMeta(response.meta))
    dispatch(setLoading(false))
}

export const loadSelectedRole = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: RoleResponseType = await getSelectedRole(id)
    dispatch(setSelectedRole(response))
    dispatch(setLoading(false))
}

export const loadRoleDropdownItems = (sort?: string, order?:string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: {items: RoleResponseType[]} = await getRoleDropdownItems(sort, order)
    const dropdownItems= getRolesForDropdown(response.items)
    dispatch(setRoleDropdownItems(dropdownItems))
    dispatch(setLoading(false))
}
/*end role*/

/*start permission*/
export const loadPermissions = (page: number, records: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: PermissionListResponseType = await getPermissions(page, records)
    dispatch(setPermissions(response.list))
    dispatch(setMeta(response.meta))
    dispatch(setLoading(false))
}

export const loadSelectedPermission = (id: number) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: PermissionResponseType = await getSelectedPermission(id)
    dispatch(setSelectedPermission(response))
    dispatch(setLoading(false))
}

export const loadPermissionDropdownItems = (sort?: string, order?:string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const response: {items: PermissionResponseType[]} = await getPermissionDropdownItems(sort, order)
    const dropdownItems= getPermissionsForDropdown(response.items)
    dispatch(setPermissionDropdownItems(dropdownItems))
    dispatch(setLoading(false))
}
/*end permission*/

/*start common*/
export const selectLoading = (state:any) => state.user.loading
export const selectMeta = (state:any) => state.user.meta
/*end common*/

/*start user*/
export const selectSelectedUserPage = (state:any) => state.user.selectedUserPage
export const selectUsers = (state:any) => state.user.users
export const selectSelectedUser = (state:any) => state.user.selectedUser
/*end user*/

/*start role*/
export const selectSelectedRolePage = (state:any) => state.user.selectedRolePage
export const selectRoles = (state:any) => state.user.roles
export const selectSelectedRole = (state:any) => state.user.selectedRole
export const selectRoleDropdownItems = (state:any) => state.user.roleDropdownItems
/*end role*/

/*start permission*/
export const selectSelectedPermissionPage = (state:any) => state.user.selectedPermissionPage
export const selectPermissions = (state:any) => state.user.permissions
export const selectSelectedPermission = (state:any) => state.user.selectedPermission
export const selectPermissionDropdownItems = (state:any) => state.user.permissionDropdownItems
/*end permission*/

export default UserSlice.reducer