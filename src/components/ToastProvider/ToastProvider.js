import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      variant: "notice",
      message: "Welcome to the Toast Playground!",
    },
    {
      id: crypto.randomUUID(),
      variant: "warning",
      message: "This is a warning message.",
    },
    {
      id: crypto.randomUUID(),
      variant: "success",
      message: "This is a success message.",
    },
    {
      id: crypto.randomUUID(),
      variant: "error",
      message: "This is an error message.",
    },
  ]);

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

  useKeyDown("Escape", () => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider
      value={{ toasts, handleAddToast, handleRemoveToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export const useToast = () => {
  const { toasts, handleAddToast, handleRemoveToast } =
    React.useContext(ToastContext);

  return {
    toasts,
    handleAddToast,
    handleRemoveToast,
  };
};
