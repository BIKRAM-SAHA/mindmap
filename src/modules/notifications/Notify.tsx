import { ToastContainer, toast } from "react-toastify";

export const notifyInfo = (msg: string) => toast.info(msg);
export const notifyWarn = (msg: string) => toast.warn(msg);
export const notifyError = (msg: string) => toast.error(msg);
export const notifySucess = (msg: string) => toast.success(msg);

export function NotifyContainer() {
    return <ToastContainer />;
}
