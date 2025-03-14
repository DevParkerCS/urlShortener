import styles from "./ChangeurlForm.module.scss";

type ChangeUrlFormProps = {
  cb: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const ChangeUrlForm = ({ cb }: ChangeUrlFormProps) => {
  return (
    <div className={styles.shortenFormWrapper}>
      <form className={styles.shortenForm} onSubmit={cb}>
        <div className={styles.shortenInputWrapper}>
          <label htmlFor="longUrlID" className={styles.shortenInputLabel}>
            Enter Long URL
          </label>
          <input
            id="longUrlID"
            placeholder="Enter URL here..."
            required
            className={styles.shortenInput}
          />
        </div>
        <div className={styles.changeBtnWrapper}>
          <button className={styles.changeBtn}>Shorten URL</button>
        </div>
      </form>
    </div>
  );
};
