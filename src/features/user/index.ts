import React from 'react'
const UserList = React.lazy(()=>import('./users/list'))
const UserCreate = React.lazy(()=>import('./users/modals/createUser'))
const UserEdit = React.lazy(()=>import('./users/modals/editUser'))
const UserPermissions = React.lazy(()=>import('./users/modals/userPermission'))
const UserRoles = React.lazy(()=>import('./users/modals/userRole'))
const UserOptionBox = React.lazy(()=>import('./users/modals/options'))
const RoleList = React.lazy(()=>import('./roles/list'))
const RoleCreate = React.lazy(()=>import('./roles/modals/createRole'))
const RoleEdit = React.lazy(()=>import('./roles/modals/editRole'))
const RolePermissions = React.lazy(()=>import('./roles/modals/rolePermission'))
const RoleOptionBox = React.lazy(()=>import('./roles/modals/options'))
const PermissionList = React.lazy(()=>import('./permissions/list'))
const PermissionOptionBox = React.lazy(()=>import('./permissions/modals/options'))

export {
    /* start user */
    UserList,
    UserCreate,
    UserEdit,
    UserRoles,
    UserPermissions,
    UserOptionBox,
    /* end user */

    /* start role */
    RoleList,
    RoleCreate,
    RoleEdit,
    RolePermissions,
    RoleOptionBox,
    /* end role */

    /* start permission */
    PermissionList,
    PermissionOptionBox
    /* end permission */
}