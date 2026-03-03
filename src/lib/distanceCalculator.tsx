export const calculateDistance = async (
    origin: string,
    destination: string,
    apiKey: string
) => {
    try {
        // Utilisez le proxy au lieu d'appeler directement Google
        const response = await fetch(
            `/api/google-maps/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&units=metric`
        );

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