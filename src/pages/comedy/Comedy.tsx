/**
 * Page that contains only 'comedy' items
 */

import { ContentType, DataResponseType } from "../../types/dataType";
import styles from "./Comedy.module.scss";
import { useEffect, useState } from "react";
import LazyImage from "../../components/LazyImage/LazyImage";
import { constants } from "./constants";
import getData from "../../services/getData";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL;

const Comedy = () => {
    const navigate = useNavigate();
    const [fetchingMoreData, setFetchingMoreData] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [data, setData] = useState<DataResponseType | null>();
    const getComedyData = async (page: number) => {
        if (page <= 3) {
            const comedyData = await getData(page);
            // Set previous data as well as an id for all inner items
            setData((prevData) => {
                return {
                    ...prevData,
                    ...comedyData,
                    "content-items": {
                        content: [
                            ...(prevData?.["content-items"]?.content || []),
                            ...comedyData["content-items"].content.map(
                                (c: ContentType, index: number) => {
                                    return {
                                        ...c,
                                        id: (c.id = `${c.name
                                            .replaceAll(" ", "")
                                            .toLocaleLowerCase()}${index}`),
                                    };
                                }
                            ),
                        ],
                    },
                };
            });
        }
    };

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchTerm(e.target.value);
    };

    /**
     *
     * @param content The 'items' to display as cards
     * @returns The filtered 'items' based on search input
     */
    const filterContent = (content: ContentType[]) => {
        if (!debouncedSearchTerm) {
            return content;
        }
        const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
        return content.filter((item) =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    const renewData = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        getComedyData(pageNumber + 1);
    };

    const handleBackButtonClick = () => {
        navigate("/");
    };

    useEffect(() => {
        getComedyData(pageNumber);
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    // Fetch/Refetch on scrollend or result end
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            const threshold = 100; // Specifying the threshold where the fetching should act
            if (
                !fetchingMoreData &&
                scrollTop + clientHeight >= scrollHeight - threshold
            ) {
                setFetchingMoreData(true);
                renewData();
                // Currently for this scenario using setTimeout as API is fast
                // In real time scenario, only after the API response is 200, setFetchingMoreData(false) should be set
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

    const content =
        filterContent(data?.["content-items"]?.content as Array<ContentType>) ||
        [];

    return (
        <div className={styles.container}>
            <Header
                title={data?.title as string}
                onSearch={handleSearch}
                onBackButtonClick={handleBackButtonClick}
            />
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
                    <div className={styles.noResults}>
                        {constants.noResults}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comedy;
