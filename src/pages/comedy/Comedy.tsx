import { ContentType } from "../../types/dataType";
import styles from "./Comedy.module.scss";
import { useEffect, useState } from "react";
import LazyImage from "../../components/LazyImage/LazyImage";
import { constants } from "./constants";

type ComedyProps = {
    content: Array<ContentType> | null;
    refetch: () => void;
};

const IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL;

const Comedy = ({ content = [], refetch }: ComedyProps) => {
    const [fetchingMoreData, setFetchingMoreData] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            const threshold = 100;
            if (
                !fetchingMoreData &&
                scrollTop + clientHeight >= scrollHeight - threshold
            ) {
                setFetchingMoreData(true);
                refetch();
                setTimeout(() => {
                    setFetchingMoreData(false);
                }, 1000);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchingMoreData]);

    return (
        <div className={styles.imageGrid}>
            {content?.length !== 0 &&
                content?.map((c: ContentType, index: number) => (
                    <div className={styles.imageContainer}>
                        <LazyImage
                            key={`image${index}`}
                            src={`${IMAGE_URL}/${c["poster-image"]}`}
                            alt={`Image ${index + 1}`}
                        />
                        <span className={styles.contentName}>{c.name}</span>
                    </div>
                ))}
            {content?.length === 0 && (
                <div className={styles.noResults}>{constants.noResults}</div>
            )}
        </div>
    );
};

export default Comedy;
