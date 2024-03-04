import { useInView } from "react-intersection-observer";
import styles from "./LazyImage.module.scss";
import { useState } from "react";
import PlaceholderImage from "../../assets/placeholderImage.webp";

type LazyImageProps = {
    src: string;
    alt: string;
};

const LazyImage = ({ src, alt }: LazyImageProps) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [ref, inView] = useInView({
        triggerOnce: true, // Load image only once when it comes into view
    });
    const handleImgError = () => {
        setImageSrc(PlaceholderImage);
    };
    return (
        <div
            ref={ref}
            className={`${styles["lazy-image"]} ${
                inView ? styles["in-view"] : ""
            }`}
        >
            {inView && (
                <img
                    className={styles.imageToLoad}
                    src={imageSrc}
                    alt={alt}
                    onError={handleImgError}
                />
            )}
        </div>
    );
};

export default LazyImage;
