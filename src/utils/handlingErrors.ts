import { toast } from 'react-toastify';

interface ErrorResponse {
  response?: {
    data?: {
        message?: string;
    };
  }
}

// Function to display a toast message
function fireToast(message?: string): void {
    const toastMessage = typeof message === 'string' ? message : String(message);
    toast.error(toastMessage);
}

// Function to handle errors and trigger a toast notification
function handlingErrors(errResp: ErrorResponse): void {
    const alertButton = document.createElement('button');

    alertButton.addEventListener('click', () => {
        fireToast(errResp?.response?.data?.message ?? 'حدث خطأ في النظام !');
    });


    document.body.appendChild(alertButton);
    alertButton.click();

    document.body.removeChild(alertButton);
}

export default handlingErrors;