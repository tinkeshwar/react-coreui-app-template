import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import AuthReducer from '../features/auth/store'
import LayoutReducer from '../features/layout/store'
import UserReducer from '../features/user/store'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    layout: LayoutReducer,
    user: UserReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
