import { confirmAlert } from 'react-confirm-alert'

export const removeWithConfirmation = (confirmAction: () => any, cancelAction: () => any) => {
    confirmAlert({
        title: 'Confirm Remove',
        message: 'Are you sure you want to remove?',
        closeOnClickOutside: false,
        buttons: [
            {
                label: 'Yes',
                onClick: confirmAction
            },
            {
                label: 'No',
                onClick: cancelAction
            }
        ]
    })
}