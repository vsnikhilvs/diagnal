export type ContentType = {
    id?: string;
    name: string;
    "poster-image": string;
};

export type ContentItemType = {
    content: Array<ContentType> | [];
};

export type DataResponseType = {
    title: string;
    "page-num-requested": number;
    "page-size-requested": number;
    "page-size-returned": number;
    "total-content-items": number;
    "content-items": ContentItemType;
};
