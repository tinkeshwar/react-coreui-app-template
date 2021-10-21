export type AuthUserProfileResponseType = {
    id: number,
    firstname: string,
    middlename: string | null,
    lastname: string | null,
    email: string,
    phone: number,
    email_verified_at: Date | null,
    phone_verified_at: Date | null,
    status: boolean,
    created_at: Date,
    updated_at: Date,
    image?: ImageType
}

export type AuthUserSettingResponseType = {
    key: string
    value: any
}

export type ProfileResponseType = {
    user: AuthUserProfileResponseType,
    setting: AuthUserSettingResponseType[],
    sidebar: []
}

export type SettingResponseType = {
    key: string,
    value: string
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