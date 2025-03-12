import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import axios from "axios";

type urlAxiosResponse = {
  shortUrl: string;
  new: string | null;
};

type shortenedUrlsType = {
  longUrl: string;
  shortUrl: string;
};

export const Home = () => {
  const [shortenedUrls, setShortenedUrls] = useState<shortenedUrlsType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    try {
      const response = await axios.post("http://localhost:8080/shorten", {
        url: input.value,
      });
      const urlData: urlAxiosResponse = response.data;
      const newUrlData: shortenedUrlsType = {
        longUrl: input.value,
        shortUrl: urlData.shortUrl,
      };

      setShortenedUrls([newUrlData, ...shortenedUrls]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUrlClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const span = e.target as HTMLSpanElement;
    const urlText = span.firstChild as Text;
    navigator.clipboard
      .writeText(urlText.data)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy! ", err);
      });
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.shortenInfoWrapper}>
        <form className={styles.shortenForm} onSubmit={handleSubmit}>
          <div className={styles.shortenInputWrapper}>
            <label htmlFor="longUrlID" className={styles.shortenInputLabel}>
              Enter Long URL
            </label>
            <input
              id="longUrlID"
              placeholder="Enter URL here..."
              className={styles.shortenInput}
            />
          </div>
          <button className={styles.shortenSubmit}>Shorten URL</button>
        </form>
      </div>

      <div className={styles.recentUrlsWrapper}>
        <div className={styles.recentUrls}>
          <h2 className={styles.recentUrlsTitle}>Recently Shortened URLs</h2>
          {shortenedUrls.length < 1 ? (
            <div className={styles.shortenedNoneTxt}>
              No Shortened Urls To Display Yet
            </div>
          ) : (
            shortenedUrls.map((urlInfo, i) => (
              <div className={styles.recentUrl} key={i}>
                {urlInfo.longUrl}:{" "}
                <span onClick={handleUrlClick} className={styles.shortenedUrl}>
                  {urlInfo.shortUrl}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
