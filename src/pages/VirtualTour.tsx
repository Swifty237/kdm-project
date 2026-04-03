/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';

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

    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
    const [deleting, setDeleting] = useState(false);

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

    // Fonction pour gérer la sélection d'une photo
    const togglePhotoSelection = (url: string) => {
        setSelectedPhotos(prev =>
            prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
        );
    };

    // Fonction pour gérer la sélection d'une vidéo
    const toggleVideoSelection = (url: string) => {
        setSelectedVideos(prev =>
            prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
        );
    };

    // Fonction de suppression
    const handleDelete = async () => {
        if (selectedPhotos.length === 0 && selectedVideos.length === 0) return;
        if (!confirm("Supprimer les éléments sélectionnés ?")) return;

        setDeleting(true);
        try {
            const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
            const res = await fetch(`${API_URL}/api/devis/virtual-tour/${token}/media`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    photoUrls: selectedPhotos,
                    videoUrls: selectedVideos
                })
            });
            if (res.ok) {
                // Recharger les données du devis
                const reload = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const reloadData = await reload.json();
                if (reload.ok) setDevis(reloadData);
                // Vider les sélections
                setSelectedPhotos([]);
                setSelectedVideos([]);
                alert("Suppression réussie");
            } else {
                const data = await res.json();
                alert(data.error || "Erreur lors de la suppression");
            }
        } catch (err) {
            alert("Erreur réseau");
        } finally {
            setDeleting(false);
        }
    };

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

            <div className="w-full p-4 shadow-lg">

                <h1 className="text-xl font-bold mb-4">Charger une ou plusieurs photos ou videos</h1>

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

                <Button className="bg-green-700 hover:bg-green-700/90" onClick={handleSubmit} disabled={uploading}>
                    {uploading ? "Envoi en cours..." : "Valider et envoyer"}
                </Button>
            </div>

            <div className="mt-8">
                {/* Affichage des photos */}
                {devis.virtualTourPhotos?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Photos</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {devis.virtualTourPhotos.map((photo, idx) => (
                                <div key={idx} className="relative">
                                    <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                                    <input
                                        type="checkbox"
                                        checked={selectedPhotos.includes(photo)}
                                        onChange={() => togglePhotoSelection(photo)}
                                        className="absolute top-1 left-1 w-5 h-5 accent-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Affichage des vidéos */}
                {devis.virtualTourVideos?.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Vidéos</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {devis.virtualTourVideos.map((video, idx) => (
                                <div key={idx} className="relative">
                                    <video controls className="w-full h-32 object-cover rounded">
                                        <source src={video} />
                                    </video>
                                    <input
                                        type="checkbox"
                                        checked={selectedVideos.includes(video)}
                                        onChange={() => toggleVideoSelection(video)}
                                        className="absolute top-1 left-1 w-5 h-5 accent-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {(devis.virtualTourPhotos?.length > 0 || devis.virtualTourVideos?.length > 0) && (
                <div className="mt-8 flex justify-between items-center">
                    <span>Selectionnez les éléments que vous souhaitez supprimer.</span>
                    <Button
                        className="bg-red-500 hover:bg-red-500/90 mb-4"
                        onClick={handleDelete}
                        disabled={deleting || (selectedPhotos.length === 0 && selectedVideos.length === 0)}
                    >
                        <Trash className="md:me-1" />
                        <span className="hidden md:flex">Supprimer la selection</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VirtualTour;