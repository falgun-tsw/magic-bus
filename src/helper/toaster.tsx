import { toast, ToastOptions, Id } from "react-toastify";

const toastConfig: ToastOptions = {
    autoClose: 2000,
    pauseOnHover: false,
    theme: "colored",
    hideProgressBar: false,
    position: "top-right", // top/bottom - left/right/center
};

type ToastType = "success" | "error" | "info" | "warning";

type ToasterFunction = (message: string, config?: ToastOptions) => void;
const activeMessages: Set<Id> = new Set();


const toaster: {
    info: ToasterFunction;
    success: ToasterFunction;
    warning: ToasterFunction;
    error: ToasterFunction;
} = {
    info: (message: string) => {
        toast.info(message, toastConfig);
    },
    success: (message: string) => {
        toast.success(message, toastConfig);
    },
    warning: (message: string) => {
        toast.warning(message, toastConfig);
    },
    error: (message: string, config: ToastOptions = {}) => {
        const finalConfig: ToastOptions = {
            ...toastConfig,
            ...config,
            autoClose: config.autoClose || toastConfig.autoClose,
        };

        toast.error(message, finalConfig);
    },
};

export const showToast = (message: string, type: ToastType = "success") => {
    if (!activeMessages.has(message)) {
      const toastId: Id = message;
  
      // Determine the appropriate toast function based on type
      const toastFunc = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
      }[type] || toast; // Default to regular toast if type is invalid
  
      // Toast options to ensure uniqueness and handle onClose
      const options: ToastOptions = {
        ...toastConfig,
        toastId,
        onClose: () => activeMessages.delete(message),
      };
  
      // Show the toast with the appropriate function and options
      toastFunc(message, options);
  
      // Add message to active messages set
      activeMessages.add(message);
    }
  }
  

export { toaster };
