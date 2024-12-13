import React from "react";

import ToastShelf from "../ToastShelf";
import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import { useToast } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [activeVariant, setActiveVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState("");

  const { handleAddToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToast(activeVariant, message);
  };

  return (
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
                    setActiveVariant(VARIANT_OPTIONS[0]);
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
        value={type}
        checked={activeVariant === type}
        onChange={() => setActiveVariant(type)}
      />
      {type}
    </label>
  );
}
