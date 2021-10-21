import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSidebar } from './helper'
import { AuthUserProfileResponseType, GlobalSidebarShowType, SettingResponseType } from './type'

export const LayoutSlice = createSlice({
    name: 'layout',
    initialState: {
        /* start comman*/
        loading:false as boolean,
        version:process.env.REACT_APP_VERSION as string,
        /* end comman*/

        /* start sidebar*/
        globalSidebar: {type: 'set', sidebarShow: true } as GlobalSidebarShowType,
        sidebar: [] as any,
        /* end sidebar*/

        /* start user*/
        profile: {} as AuthUserProfileResponseType,
        settings: [] as SettingResponseType[],
        /* end  user*/

    },
    reducers:{
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setGlobalSidebar: (state, action:PayloadAction<GlobalSidebarShowType>) => {
            state.globalSidebar = action.payload
        },
        setProfile: (state, action:PayloadAction<AuthUserProfileResponseType>) => {
            state.profile = action.payload
        },
        setSettings: (state, action:PayloadAction<SettingResponseType[]>) => {
            state.settings = action.payload
            localStorage.setItem('settings', JSON.stringify(action.payload))
        },
        setSidebar: (state, action)=>{
            state.sidebar = action.payload
        }
   }
})

export const {
    setLoading,
    setGlobalSidebar,
    setProfile,
    setSettings,
    setSidebar
} = LayoutSlice.actions

export const getUserProfile = (profile:any) => async (dispatch: any) => {
    dispatch(setLoading(true))
    dispatch(setProfile(profile.user))
    dispatch(setSettings(profile.setting))
    dispatch(setSidebar(getSidebar(profile.sidebar)))
    dispatch(setLoading(false))
}

export const selectLoading = (state:any) => state.layout.loading
export const selectVersion = (state:any) => state.layout.version
export const selectGlobalSidebar = (state: any) => state.layout.globalSidebar
export const selectUserProfile = (state: any) =>  state.layout.profile
export const selectSidebar = (state: any) => state.layout.sidebar

export default LayoutSlice.reducer