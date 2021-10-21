import {
    AuthUserProfileResponseType,
    AuthUserSettingResponseType,
    ImageType,
    ProfileResponseType,
    SettingResponseType
} from './response'

export type {
    AuthUserProfileResponseType,
    AuthUserSettingResponseType,
    ProfileResponseType,
    SettingResponseType,
    ImageType
}

export type GlobalLayoutProp = {
    children?: React.ReactNode;
}

export type GlobalSidebarShowType = {
    type: string, sidebarShow: any;
}

export type LoaderProp = {
    location?: string;
    timer?: number;
    message?: string;
}