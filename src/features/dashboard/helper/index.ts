import { CPUStateResponseType } from '../type'

export const dashOneCPUdata = (cpu: CPUStateResponseType[]) => {
    let labels = [] as any
    let datasetone = [] as any
    let datasettwo = [] as any
    let datasetthree = [] as any
    cpu.forEach((usage: CPUStateResponseType)=>{
        const time = new Date(usage.timestamp)
        const uptime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        labels.push(uptime)
        datasetone.push((usage.cpu?.percent || 0).toFixed(2))
        datasettwo.push(usage.cpu.idle)
        datasetthree.push(usage.cpu.total)
    })
    return {
        labels: labels,
        datasets: [
            {
                label: 'Usage',
                data: datasetone,
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Idle',
                data: datasettwo,
                fill: true,
                backgroundColor: 'rgba(45, 227, 45)',
                borderColor: 'rgba(45, 227, 45, 0.2)',
            },
            {
                label: 'Total',
                data: datasetthree,
                fill: true,
                backgroundColor: 'rgba(45, 68, 227)',
                borderColor: 'rgba(45, 68, 227, 0.2)',
            }
        ],
    }
}

export const getUptime = (cpu: CPUStateResponseType[], type?: string) => {
    if(cpu.length > 0){
        if(type === undefined)
            return ((cpu[cpu.length-1].uptime)/3600).toFixed(2)
        if(type === 'total')
            return ((cpu[cpu.length-1].cpu.total))
        if(type === 'idle')
            return ((cpu[cpu.length-1].cpu.idle))
    }
    return 0
}

export const getCPUUsage = (cpu: CPUStateResponseType[], type?: string) => {
    if(cpu.length > 0){
        if(type === undefined){
            return (cpu[cpu.length-1].usage.cpu).toFixed(2)
        }
        if(type === 'memory'){
            const memory = cpu[cpu.length-1].usage.memory
            if(memory>0){
                return (memory/(1024*1024)).toFixed(2)
            }
        }
    }
    return 0
}