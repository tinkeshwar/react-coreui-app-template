export type CPUResponseType = {
    idle:number,
    total:number,
    percent?: number
}

export type CPUUsageResponseType = {
    cpu: number,
    memory: number,
    ctime: number,
    elapsed: number,
    timestamp: number
}

export type CPUStateResponseType = {
    uptime:number,
    timestamp:number,
    cpu: CPUResponseType,
    usage: CPUUsageResponseType
}