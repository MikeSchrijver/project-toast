import React from "react";

import ToastShelf from "../ToastShelf";
import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastProvider, { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [activeVariant, setActiveVariant] = React.useState("notice");
  const [message, setMessage] = React.useState("");

  const { handleAddToast } = React.useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToast(activeVariant, message);
  };

  return (
    <ToastProvider>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>
        <ToastShelf />
        <form onSubmit={handleSubmit}>
          <div className={styles.controlsWrapper}>
            <div className={styles.row}>
              <label
                htmlFor="message"
                className={styles.label}
                style={{ alignSelf: "baseline" }}
              >
                Message
              </label>
              <div className={styles.inputWrapper}>
                <textarea
                  id="message"
                  className={styles.messageInput}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                      setMessage("");
                    }
                  }}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Variant</div>
              <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                {VARIANT_OPTIONS.map((variant) => (
                  <ToastVariant
                    key={variant}
                    type={variant}
                    activeVariant={activeVariant}
                    setActiveVariant={setActiveVariant}
                  />
                ))}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.label} />
              <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                <Button type="submit">Pop Toast!</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ToastProvider>
  );
}

export default ToastPlayground;

function ToastVariant({ type, activeVariant, setActiveVariant }) {
  const id = `variant-${type}`;

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="radio"
        name="variant"
        value={type === activeVariant}
        onChange={() => setActiveVariant(type)}
      />
      {type}
    </label>
  );
}
