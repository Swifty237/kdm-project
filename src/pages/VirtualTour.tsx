/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DevisVirtualTour {
    _id: string;
    devisNumber: string;
    virtualTourPhotos?: string[];
    virtualTourVideos?: string[];
}

const VirtualTour = () => {
    const { token } = useParams<{ token: string }>();
    const [devis, setDevis] = useState<DevisVirtualTour | null>(null);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDevis = async () => {
            try {
                const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
                const res = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const data = await res.json();
                if (res.ok) {
                    setDevis(data);
                } else {
                    setError(data.error || "Devis introuvable");
                }
            } catch (err) {
                setError("Erreur de chargement");
            } finally {
                setLoading(false);
            }
        };
        fetchDevis();
    }, [token]);

    useEffect(() => {
        console.log("Photos : ", devis.virtualTourPhotos);
        console.log("Videos : ", devis.virtualTourVideos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (photos.length + files.length > 20) {
            alert("Vous ne pouvez ajouter que 20 photos maximum.");
            return;
        }
        setPhotos(prev => [...prev, ...files]);
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxSize = 100 * 1024 * 1024; // 100 Mo
        const oversized = files.some(f => f.size > maxSize);
        if (oversized) {
            alert("Aucune vidéo ne doit pas dépasser 100 Mo.");
            return;
        }
        setVideos(prev => [...prev, ...files]);
    };

    const handleSubmit = async () => {
        if (photos.length === 0 && videos.length === 0) {
            alert("Veuillez sélectionner au moins une photo ou une vidéo.");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        photos.forEach(photo => formData.append('photos', photo));
        videos.forEach(video => formData.append('videos', video));

        try {
            const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
            const res = await fetch(`${API_URL}/api/devis/virtual-tour/${token}/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                alert("Fichiers envoyés avec succès !");
                // Optionnel : recharger les données pour afficher les fichiers uploadés
                setPhotos([]);
                setVideos([]);
                // Recharger les infos du devis
                const reload = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const reloadData = await reload.json();
                if (reload.ok) setDevis(reloadData);
            } else {
                alert(data.error || "Erreur lors de l'upload");
            }
        } catch (err) {
            alert("Erreur réseau");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="text-center p-8">Chargement...</div>;
    if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
    if (!devis) return <div className="text-center p-8">Devis non trouvé</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Visite virtuelle - Devis n° {devis.devisNumber}</h1>

            {/* Affichage des médias déjà existants (optionnel) */}
            {(devis.virtualTourPhotos?.length > 0 || devis.virtualTourVideos?.length > 0) && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Médias déjà ajoutés</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {devis.virtualTourPhotos?.map((photo, idx) => (
                            <img key={idx} src={photo} alt={`Photo ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                        ))}
                        {devis.virtualTourVideos?.map((video, idx) => (
                            <video key={idx} controls className="w-full h-32 object-cover rounded">
                                <source src={video} />
                            </video>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label className="block font-bold mb-2">Photos (max 20)</label>
                <Input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
                {photos.length > 0 && (
                    <p className="text-sm mt-1">{photos.length} photo(s) sélectionnée(s)</p>
                )}
            </div>

            <div className="mb-6">
                <label className="block font-bold mb-2">Vidéos (max 100 Mo par fichier)</label>
                <Input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
                {videos.length > 0 && (
                    <p className="text-sm mt-1">{videos.length} vidéo(s) sélectionnée(s)</p>
                )}
            </div>

            <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Envoi en cours..." : "Valider et envoyer"}
            </Button>
        </div>
    );
};

export default VirtualTour;