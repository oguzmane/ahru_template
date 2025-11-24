// Fetch function
async function fetchDataset(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dataset:', error);
        return {}; // Return an empty object in case of error
    }
}