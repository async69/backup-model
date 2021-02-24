import { confirmAlert } from 'react-confirm-alert'

const defaultTitle = "Confirm to submit"
const defaultMessage = "Are you sure you want to do this?"
const defaultOkCallback = (id) => null
const defaultErrCallback = (id) => null

export const ConfirmAlert = ({ title, message, okCallback, errCallback, id }) => {
    var props = {
        title: title? title : defaultTitle,
        message: message? message : defaultMessage,
        okCallback: okCallback? () => okCallback(id) : defaultOkCallback,
        errCallback: errCallback? () => errCallback(id) : defaultErrCallback
    }
    confirmAlert({
        ...props,
        buttons: [
            { label: 'Yes', onClick: props.okCallback },
            { label: 'No', onClick: props.errCallback }
        ]
    })
}