import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Comedy from "./pages/comedy/Comedy";
import getData from "./services/getData";
import { ContentType, DataResponseType } from "./types/dataType";
import "./App.css";

function App() {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [data, setData] = useState<DataResponseType | null>();
    const getComedyData = async (page: number) => {
        if (page <= 3) {
            const comedyData = await getData(page);
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

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

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

    useEffect(() => {
        getComedyData(pageNumber);
    }, []);

    return (
        <div className="container">
            <Header title={data?.title as string} onSearch={handleSearch} />
            <Comedy
                content={filterContent(
                    data?.["content-items"]?.content as Array<ContentType>
                )}
                refetch={renewData}
            />
        </div>
    );
}

export default App;
