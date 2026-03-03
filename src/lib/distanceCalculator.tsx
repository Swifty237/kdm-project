export const calculateDistance = async (
    origin: string,
    destination: string
) => {
    try {
        console.log('📍 Calcul de distance:', { origin, destination });

        // Utilisation de votre backend proxy (plus de clé API en frontend)
        const response = await fetch(
            `/api/google-maps/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error || `HTTP error! status: ${response.status}`
            );
        }

        const data = await response.json();

        // Vérification que les données sont valides
        if (data.status !== 'OK') {
            throw new Error(`Google Maps error: ${data.status}`);
        }

        // Extraction de la distance et durée
        const element = data.rows[0]?.elements[0];
        if (element?.status !== 'OK') {
            throw new Error('Impossible de calculer la distance pour cette destination');
        }

        return {
            distance: element.distance.text,
            distanceValue: element.distance.value, // en mètres
            duration: element.duration.text,
            durationValue: element.duration.value, // en secondes
            status: 'OK'
        };

    } catch (error) {
        console.error('❌ Error calculating distance:', error);
        throw error;
    }
};