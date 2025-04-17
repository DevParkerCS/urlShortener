import { useEffect, useState } from "react";
import { shortenedUrlsType } from "../../../Home/Components/UrlInfo/UrlInfo";
import styles from "./UrlSelect.module.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

type UrlSelectProps = {
  setSelectedUrl: React.Dispatch<
    React.SetStateAction<shortenedUrlsType | null>
  >;
  selectedUrl: shortenedUrlsType | null;
};

export const UrlSelect = ({ setSelectedUrl, selectedUrl }: UrlSelectProps) => {
  const [urls, setUrls] = useState<shortenedUrlsType[]>([]);
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    getAllUrls();
  }, []);

  useEffect(() => {
    if (selectedUrl) {
      setSelectedUrl(selectedUrl);
    }
  }, [selectedUrl]);

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

  const handleUrlClick = (url: shortenedUrlsType) => {
    setSelectedUrl(url);
    setDropdownActive(false);
  };

  return (
    <div className={styles.componentWrapper}>
      {selectedUrl != null && (
        <div
          className={`${styles.urlWrapper} ${styles.selected}`}
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <div className={styles.urlInfo}>
            <span>{selectedUrl.longUrl}</span>
            <span>http://localhost:3000/{selectedUrl.shortUrl}</span>
          </div>
          <div className={styles.dropdownBtn}>
            {dropdownActive ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </div>
        </div>
      )}

      <div
        className={`${styles.urlsWrapper} ${dropdownActive && styles.active}`}
      >
        {urls.map((u, i) => (
          <div
            className={`${styles.urlWrapper}`}
            key={i}
            onClick={() => handleUrlClick(u)}
          >
            <span>{u.longUrl}</span>
            <span>http://localhost:3000/{u.shortUrl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
