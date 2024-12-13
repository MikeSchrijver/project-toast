import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { useToast } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toasts, handleRemoveToast } = useToast();

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            handleClose={() => handleRemoveToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
