import { useState } from "react";
import styles from "./UrlInfo.module.scss";
import axios, { AxiosError } from "axios";
import { ChangeUrlForm } from "../ChangeUrlForm/ChangeUrlForm";
import { RecentlyUsedUrls } from "../RecentlyUsedUrls/RecentlyUsedUrls";

type urlAxiosResponse = {
  shortUrl: string;
  new: string | null;
};

export type shortenedUrlsType = {
  longUrl: string;
  shortUrl: string;
  totalClicks: number;
};

export const UrlInfo = () => {
  const [shortenedUrls, setShortenedUrls] = useState<shortenedUrlsType[]>([]);
  const [inputError, setInputError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    try {
      const response = await axios.post("http://localhost:8080/shorten", {
        url: input.value,
      });
      const urlData: shortenedUrlsType = response.data;
      urlData.shortUrl = "localhost:3000/" + urlData.shortUrl;
      console.log(urlData);

      const index = shortenedUrls.findIndex(
        (element) => element.shortUrl === urlData.shortUrl
      );
      // Check if the shortened url has already been shortened
      if (index === -1) {
        setShortenedUrls([urlData, ...shortenedUrls]);
      } else {
        setShortenedUrls((prevState) => {
          const newArray = [...prevState];
          const removed = newArray.splice(index, 1);
          newArray.unshift(removed[0]);
          return newArray;
        });
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.status === 406) {
      }
    }
  };

  return (
    <div>
      <div className={styles.topContentWrapper}>
        <ChangeUrlForm cb={handleSubmit} />
        <div className={styles.topContentText}>
          <div>
            <h2>Shorten Your Links,</h2>
            <h2>Expand Your Website!</h2>
          </div>
          <div>
            <p>
              Want more out of your link shortener? Track link analytics by
              being logged in or creating an account!
            </p>
          </div>
        </div>
      </div>
      <RecentlyUsedUrls
        shortenedUrls={shortenedUrls}
        setShortenedUrls={setShortenedUrls}
      />
    </div>
  );
};
