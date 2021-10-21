export const handleDateInput = (value: string) => {
    if (!!value) {
        if (value.length === 10 || value.length === 25) {
            const dateString = new Date(value)
            const date = ('0'+dateString.getDate()).slice(-2)
            const month = ('0'+(dateString.getMonth()+1)).slice(-2)
            const year = dateString.getFullYear()

            return date+'-'+month+'-'+year
        }
        else {
            return ''
        }
    }
    else {
        return ''
    }
}

export const handleTimeInput = (value:string) => {
    if (!!value) {
        if (value.length === 25) {
            const timeString = new Date(value)
            const hours = ('0'+timeString.getHours()).slice(-2)
            const minutes = ('0'+timeString.getMinutes()).slice(-2)

            return hours+':'+minutes
        }
        else {
            return ''
        }
    }
    else {
        return ''
    }
}

export const validateDate = (dateString: string|null) => {

    const dateFormat = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

    if (!!dateString) {
        if (dateString.length === 10) {
            if (dateString.match(dateFormat)) {
                return true
            }else {
                return false
            }
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

export const validateTime = (timeString: string) => {

    const timeFormat = /(0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9])$/

    if (timeString.length === 5) {
        if (timeString.match(timeFormat)) {
            return true
        }else {
            return false
        }
    }
    else {
        return false
    }
}

export const handleTwoDigitYears = (value: string) => {
    if (parseInt(value) > 50) {
        return '19'+value
    }else return '20'+value
}

export const getTimeZoneString = (value:number) => {
    const offsetMinutes = value >= 0 ? value : (value*-1)
    const hours = ('0'+((offsetMinutes/60).toString().slice(0,1))).slice(-2)
    const minutes = ('0'+(offsetMinutes%60)).slice(-2)
    return value >= 0 ? ('-'+hours+':'+minutes) : ('+'+hours+':'+minutes)
}