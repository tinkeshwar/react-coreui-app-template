import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLoginLog, getProfile, signOut } from './api'
import { AuthResponseType, AuthUserResponseType, UserLoginHistoryResponseListType, UserLoginHistoryResponseType } from './type'

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        /*start common*/
        loading:false as boolean,
        message:'' as string,
        token:'' as string,
        refresh:'' as string,
        /*end common*/

        /*start user*/
        user:{} as AuthUserResponseType,
        profile: {} as AuthResponseType,
        isLoggedIn: false as boolean,
        loginLog: [] as UserLoginHistoryResponseType[],
        currentLog: '' as string,
        /*end user*/
    },
    reducers:{
        /*start common*/
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setAlert: (state, action:PayloadAction<string>) =>{
            state.message = action.payload
        },
        setToken: (state, action:PayloadAction<string>) => {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
            state.isLoggedIn = true
        },
        setRToken: (state, action:PayloadAction<string>) => {
            localStorage.setItem('refresh', action.payload)
            state.refresh = action.payload
        },
        /*end common*/

        /*start user*/
        setProfile: (state, action:PayloadAction<AuthResponseType>) => {
            state.profile = action.payload
        },
        setUser: (state, action:PayloadAction<AuthUserResponseType>) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action:PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        refresh:(state, action:PayloadAction<string>) => {
            const token = action.payload
            state.token = token || ''
            state.isLoggedIn = token? true:false
        },
        setLoginLog: (state, action: PayloadAction<UserLoginHistoryResponseType[]>) => {
            state.loginLog = action.payload
        },
        setCurrentLog: (state, action:PayloadAction<string>) => {
            state.currentLog = action.payload
        }
        /*end user*/
    }
})

export const {
    setLoading,
    setAlert,
    setToken,
    setRToken,
    setProfile,
    setUser,
    setLoggedIn,
    refresh,
    setLoginLog,
    setCurrentLog
} = AuthSlice.actions

/*start user*/
export const logUser = (auth: AuthResponseType) => (dispatch: any) => {
    dispatch(setUser(auth.user))
    dispatch(setToken(auth.token))
    dispatch(setRToken(auth.refresh))
    dispatch(loadUserProfile())
    dispatch(setLoading(false))
}
/*end user*/

export const loadUserProfile = () => async (dispatch: any) => {
    dispatch(setLoading(true))
    const profile: AuthResponseType = await getProfile()
    dispatch(setProfile(profile))
    dispatch(setUser(profile.user))
    dispatch(setLoading(false))
}

export const loadUserLoginLog = (id?: string, clear?: boolean) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const log: UserLoginHistoryResponseListType = await getLoginLog(id, clear)
    dispatch(setLoginLog(log.list))
    dispatch(setCurrentLog(log.current))
    dispatch(setLoading(false))
}

export const loadRefresh = () => async (dispatch: any) => {
    dispatch(setLoading(true))
    const token = localStorage.getItem('token')
    if(token){
        dispatch(refresh(token))
        dispatch(loadUserProfile())
    }
    dispatch(setLoading(false))
}

/*start logout*/
export const logOut = () => async (dispatch: any) => {
    dispatch(setLoading(true))
    await signOut()
    localStorage.clear()
    dispatch(loadUserProfile())
    dispatch(setLoading(false))
}
/*end logout*/

export const selectLoading = (state:any) => state.auth.loading
export const selectAlert = (state:any) => state.auth.message
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectAuthUser = (state: any) => state.auth.user
export const selectLoginLog = (state: any) => state.auth.loginLog
export const selectCurrentLog = (state: any) => state.auth.currentLog
export const selectAuthProfile = (state: any) =>state.auth.profile

export default AuthSlice.reducer