import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleAddToast = (variant, message) => {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant: variant,
        message: message,
      },
    ]);
  };

  const handleRemoveToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{ toasts, handleAddToast, handleRemoveToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
