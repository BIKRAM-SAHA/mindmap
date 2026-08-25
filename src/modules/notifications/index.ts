import { toast } from 'react-toastify'

export { NotifyContainer as default } from './Notify'
export const notifyInfo = (msg: string) => toast.info(msg)
export const notifyWarn = (msg: string) => toast.warn(msg)
export const notifyError = (msg: string) => toast.error(msg)
export const notifySucess = (msg: string) => toast.success(msg)
