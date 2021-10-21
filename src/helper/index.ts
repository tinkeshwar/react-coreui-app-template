import { confirmAlert } from 'react-confirm-alert'

export const setBodyColor = (color: string) =>{
    document.body.style.backgroundColor=`#${color}`
}

export const isEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email !== '' && regex.test(email)) {
        return true
    }
    return false
}

export const isPassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (password !== '' && regex.test(password)) {
        return true
    }
    return false
}

export const fullDateFormat = (rawDate: Date | null) => {
    if(rawDate){
        const date = new Date(rawDate)
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const dateOrdinal=(dom: number)=> {
            if (dom === 31 || dom === 21 || dom === 1) return dom + 'st'
            else if (dom === 22 || dom === 2) return dom + 'nd'
            else if (dom === 23 || dom === 3) return dom + 'rd'
            else return dom + 'th'
        }
        return days[date.getDay()]+' '+dateOrdinal(date.getDate())+', '+ months[date.getMonth()]+', '+date.getFullYear()
    }
    return '--'
}

export const forceDownload = (blob: Blob, filename: any) => {
    const url = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    const name = filename.replaceAll(' ', '-').toLowerCase()
    link.href = url
    link.setAttribute('download',`${name}.pdf`)
    document.body.appendChild(link)
    link.click()
    if (link.parentNode) link.parentNode.removeChild(link)
}

export const getBase64 = (blob:Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', function () {
            resolve(reader.result)
        }, false)
        reader.onerror = () => {
            return reject(Promise)
        }
        return reader.readAsDataURL(blob)
    })
}

export const deleteWithConfirmation = (deleteAction: () => any, cancelAction: () => any) => {
    confirmAlert({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this?',
        closeOnClickOutside: false,
        buttons: [
            {
                label: 'Yes',
                onClick: deleteAction
            },
            {
                label: 'No',
                onClick: cancelAction
            }
        ]
    })
}

export const convertBase64ToBlob = (base64Image: string) => {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: imageType })
  }