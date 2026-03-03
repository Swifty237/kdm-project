export const calculateDistance = async (
    origin: string,
    destination: string,
    apiKey: string
) => {
    try {
        // Appel direct à Google Maps
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calculating distance:', error);
        throw error;
    }
};