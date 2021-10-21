import {
    ImageType,
    MetaType,
    PermissionListResponseType,
    PermissionResponseType,
    RoleListResponseType,
    RoleResponseType,
    StatusChangeType,
    UserListResponseType,
    UserResponseType
} from './response'

export type {
    MetaType,
    StatusChangeType,
    ImageType,
    UserListResponseType,
    UserResponseType,
    RoleListResponseType,
    RoleResponseType,
    PermissionListResponseType,
    PermissionResponseType
}

export type DropdownItemType = {
    id: string|number,
    title: string
}

export type UserListCustomType = {
    Id:number,
    Name:string,
    Email:string,
    Phone:number,
    Status:string
}

export type RoleListCustomType = {
    Id: number,
    Name: string,
    Description: string,
    Status: string
}

export type PermissionListCustomType = {
    Id: number,
    Name: string,
    Level: string,
    Status: string
}

export type UserPostType = {
    firstname: string|undefined,
    middlename: string|undefined,
    lastname: string|undefined,
    email: string|undefined,
    phone: number|undefined,
    password?: string|undefined,
    image?: ImagePostType
}

export type ImagePostType = {
    path: string|undefined,
    ext: string|undefined
}