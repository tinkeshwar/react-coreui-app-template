export type MetaType = {
    total: number,
    page: number,
    per_page: number
}

export type StatusChangeType = {
    success: string,
    status: boolean
}

export type ImageType = {
    id: number,
    name: string,
    path: string,
    public_url: string,
    status: boolean,
    created_at: Date,
    updated_at: Date
}

export type UserListResponseType = {
    list: UserResponseType[],
    meta: MetaType
}

export type UserResponseType = {
    id: number,
    firstname: string,
    middlename: string | null,
    lastname: string | null,
    email: string,
    phone: number,
    image?: ImageType|null,
    email_verified_at: Date | null,
    phone_verified_at: Date | null,
    status: boolean,
    created_at: Date,
    updated_at: Date,
    roles: RoleResponseType[],
    permissions: PermissionResponseType[]
}

export type RoleListResponseType = {
    list: RoleResponseType[],
    meta: MetaType
}

export type RoleSidebarResponseType = {
    id: number,
    role_id: number,
    sidebar:string,
    status: boolean,
    created_at: Date,
    updated_at: Date,
}

export type RoleResponseType = {
    id: number,
    name: string,
    alias: string,
    description: string,
    status: boolean,
    created_at: Date,
    updated_at: Date,
    permissions: PermissionResponseType[],
    role_sidebar: RoleSidebarResponseType
}

export type PermissionListResponseType = {
    list: PermissionResponseType[],
    meta: MetaType
}

export type PermissionResponseType = {
    id: number,
    name: string,
    level: string,
    status: boolean,
    created_at: Date,
    updated_at: Date
}