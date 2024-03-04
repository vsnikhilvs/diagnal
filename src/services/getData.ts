const BASE_URL = process.env.REACT_APP_BASE_URL;

const getData = async (page: number) => {
    const response = await fetch(`${BASE_URL}/page${page}.json`).then(
        (res) => {
            return res.json();
        }
    );
    return response.page;
};

export default getData;
