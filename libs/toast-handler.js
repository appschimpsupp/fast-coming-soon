import { Toast } from '@shopify/app-bridge/actions';

/**
 * Show toast.
 */
export const showToast = (app, isError, msg) => {
    const mcToastOptions = {
        message: msg,
        duration: 3000,
        isError: isError,
    };
    const mcToastNotice = Toast.create(app, mcToastOptions);
    mcToastNotice.dispatch(Toast.Action.SHOW);
}