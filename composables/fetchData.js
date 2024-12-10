export const fetchData = async (jsonPath, options = {}) => {
    try {
        const response = await fetch(jsonPath, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
};
