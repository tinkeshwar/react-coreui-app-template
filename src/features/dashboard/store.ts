import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCPU } from './api'
import { CPUStateResponseType } from './type'

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        /*start common*/
        loading:false as boolean,
        /*end common*/
        /* start dashboard one */
        cpu: [] as CPUStateResponseType[]
        /* end dashboard one */
    },
    reducers:{
        /*start common*/
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        /*end common*/

        /* start dashboard one */
        setCPU: (state, action:PayloadAction<CPUStateResponseType[]>) => {
            state.cpu = action.payload
        }
        /* end dashboard one */
   }
})

export const {
    setLoading,
    setCPU
} = DashboardSlice.actions

export const loadCPU = (cpu?: CPUStateResponseType[]) => async(dispatch: any) =>{
    dispatch(setLoading(false))
    const cpuResponse = await getCPU()
    if(cpu !== undefined && cpu?.length > 0){
        if(cpu.length > 30){
            cpu.shift()
        }
        cpu.push(cpuResponse)
        dispatch(setCPU(cpu))
    }else{
        let cpuInti = [] as CPUStateResponseType[]
        cpuInti.push(cpuResponse)
        dispatch(setCPU(cpuInti))
    }
    dispatch(setLoading(true))
}

export const selectLoading = (state:any) => state.dashboard.loading
export const selectCpu = (state:any) => state.dashboard.cpu

export default DashboardSlice.reducer