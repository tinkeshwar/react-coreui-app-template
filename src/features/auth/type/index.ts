import {
    AuthResponseType,
    AuthUserResponseType,
    AuthUserSettingResponseType,
    ImageType,
    UserAgentType,
    UserLoginHistoryResponseListType,
    UserLoginHistoryResponseType
} from './response'

export type {
    AuthUserResponseType,
    AuthUserSettingResponseType,
    AuthResponseType,
    ImageType,
    UserLoginHistoryResponseListType,
    UserLoginHistoryResponseType,
    UserAgentType
}

export type ImagePostType = {
    path: string|undefined,
    ext: string|undefined
}

export type UserPostType = {
    firstname: string|undefined,
    middlename: string|undefined,
    lastname: string|undefined,
    phone: number|undefined,
    image?: ImagePostType
}