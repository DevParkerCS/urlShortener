import { useEffect, useState } from "react";
import { shortenedUrlsType } from "../../../Home/Components/UrlInfo/UrlInfo";
import styles from "./UrlSelect.module.scss";
import axios from "axios";

export const UrlSelect = () => {
  const [urls, setUrls] = useState<shortenedUrlsType[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<shortenedUrlsType>(urls[0]);
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    getAllUrls();
  }, []);

  const getAllUrls = async () => {
    try {
      const rawUrls = await axios.get("http://localhost:8080/all");
      const urls: shortenedUrlsType[] = rawUrls.data;
      setUrls(urls);
      setSelectedUrl(urls[0]);
    } catch {
      console.log("error fetching urls");
    }
  };

  return (
    <div>
      {selectedUrl != null && (
        <div
          className={styles.urlWrapper}
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <span>{selectedUrl.longUrl}</span>
          <span>https://localhost:3000/{selectedUrl.shortUrl}</span>
        </div>
      )}

      <div
        className={`${styles.urlsWrapper} ${dropdownActive && styles.active}`}
      >
        {urls.map((u, i) => (
          <div
            className={`${styles.urlWrapper}`}
            key={i}
            onClick={() => setSelectedUrl(u)}
          >
            <span>{u.longUrl}</span>
            <span>https://localhost:3000/{u.shortUrl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
