import { confirmAlert } from 'react-confirm-alert'

export const logoutWithConfirmation = (logoutAction: () => any, cancelAction: () => any) => {
    confirmAlert({
        title: 'Confirm Logout',
        message: 'Are you sure you want to logout?',
        closeOnClickOutside: false,
        buttons: [
            {
                label: 'Yes',
                onClick: logoutAction
            },
            {
                label: 'No',
                onClick: cancelAction
            }
        ]
    })
}

export const createImage = (url: string| undefined, height?: number, width?: number) => {
    if(url !== undefined){
        return url
    }else{
        return `https://dummyimage.com/${width || 100}x${height || 100}/e6dfe6/0011ff`
    }
}

export const getSidebar = (sidebars: any) => {
    if(sidebars !== undefined && sidebars.length>0){
        return sidebars[0]
    }
    return []
}