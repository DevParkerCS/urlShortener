import { shortenedUrlsType } from "../UrlInfo/UrlInfo";
import styles from "./RecentlyUsedUrls.module.scss";

type RecentlyUsedUrlsProps = {
  shortenedUrls: shortenedUrlsType[];
  setShortenedUrls: React.Dispatch<React.SetStateAction<shortenedUrlsType[]>>;
};

export const RecentlyUsedUrls = ({
  shortenedUrls,
  setShortenedUrls,
}: RecentlyUsedUrlsProps) => {
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

  const truncateLongUrl = (url: string) => {
    return url.length > 50 ? url.slice(0, 50 - 3) + "..." : url;
  };

  return (
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
              {truncateLongUrl(urlInfo.longUrl)} :{" "}
              <span onClick={handleUrlClick} className={styles.shortenedUrl}>
                {urlInfo.shortUrl}
              </span>{" "}
              <span className={styles.copySpan}>Copy</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
