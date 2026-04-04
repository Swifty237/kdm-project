/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Send, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConfirmDialog from '@/components/ConfirmDialog';

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
    const { toast } = useToast();
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
    const [deleting, setDeleting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmDeleteMultiple, setConfirmDeleteMultiple] = useState(false);

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

    // Modifie la fonction handleDelete pour ouvrir le dialogue
    const handleDelete = () => {
        if (selectedPhotos.length === 0 && selectedVideos.length === 0) return;
        setConfirmOpen(true); // Ouvre le dialogue au lieu de confirm()
    };

    // Nouvelle fonction qui effectue la suppression après confirmation
    const handleConfirmDelete = async () => {
        setConfirmOpen(false);
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
                const reload = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const reloadData = await reload.json();
                if (reload.ok) setDevis(reloadData);
                setSelectedPhotos([]);
                setSelectedVideos([]);
                toast({
                    description: "Suppression réussie !",
                    className: "bg-green-600 text-white border-none",
                });

            } else {
                const data = await res.json();
                toast({ description: data.error || "Erreur lors de la suppression", variant: "destructive" });
            }
        } catch (err) {
            toast({ description: "Erreur réseau", variant: "destructive" });
        } finally {
            setDeleting(false);
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (photos.length + files.length > 20) {
            toast({
                title: "Attention !",
                description: "Vous ne pouvez ajouter que 20 photos maximum.",
                variant: "destructive"
            });
            // alert("Vous ne pouvez ajouter que 20 photos maximum.");
            return;
        }
        setPhotos(prev => [...prev, ...files]);
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxSize = 10 * 1024 * 1024; // 10 Mo
        const maxCount = 10;

        // Vérifier la taille
        const oversized = files.some(f => f.size > maxSize);
        if (oversized) {
            toast({
                title: "Attention !",
                description: "Aucune vidéo ne doit dépasser 10 Mo.",
                variant: "destructive"
            });
            // alert("Aucune vidéo ne doit dépasser 10 Mo.");
            return;
        }

        // Vérifier le nombre
        if (videos.length + files.length > maxCount) {
            toast({
                title: "Attention !",
                description: `Vous ne pouvez ajouter que ${maxCount} vidéos au maximum.`,
                variant: "destructive"
            });
            // alert(`Vous ne pouvez ajouter que ${maxCount} vidéos au maximum.`);
            return;
        }

        setVideos(prev => [...prev, ...files]);
    };

    const handleSubmit = async () => {
        if (photos.length === 0 && videos.length === 0) {
            toast({
                title: "Attention !",
                description: "Vous devez sélectionner au moins une photo ou une vidéo.",
                variant: "destructive"
            });
            // alert("Veuillez sélectionner au moins une photo ou une vidéo.");
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

                toast({
                    description: "Fichiers envoyés avec succès !",
                    className: "bg-green-600 text-white border-none",
                });

                // alert("Fichiers envoyés avec succès !");
                // Optionnel : recharger les données pour afficher les fichiers uploadés
                setPhotos([]);
                setVideos([]);
                // Recharger les infos du devis
                const reload = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const reloadData = await reload.json();
                if (reload.ok) setDevis(reloadData);
            } else {
                toast({
                    description: data.error || "Erreur lors de l'upload",
                    variant: "destructive"
                });
                // alert(data.error || "Erreur lors de l'upload");
            }
        } catch (err) {
            toast({
                title: "Erreur reseau",
                description: err,
                variant: "destructive"
            });
            // alert("Erreur réseau");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center mt-8 h-40 items-center p-8">
            <Loader className="h-4 w-4 animate-spin" />
        </div>);
    if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
    if (!devis) return <div className="text-center p-8">Devis non trouvé</div>;

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Visite virtuelle - Devis n° {devis.devisNumber}</h1>

            <div className="mb-6 p-4 bg-[#ecf0f1] border border-[#ecf0f1] rounded-sm shadow-xl">
                <h3 className="text-lg font-semibold text-[#001964] mb-2">
                    📸 Conseils pour des médias utiles
                </h3>
                <p className="text-[#001964] mb-2">
                    Pour que nous puissions préparer votre déménagement dans les meilleures conditions,
                    merci de bien vouloir nous fournir des photos ou vidéos (ou les deux) des éléments suivants :
                </p>
                <ul className="list-disc list-inside text-[#001964] space-y-1 mb-3 ml-2">
                    <li>Chaque pièce à déménager (angle large de préférence)</li>
                    <li>L’emplacement de parking potentiel pour le camion (vue depuis la rue, signaler si zone très passante ou réglementée)</li>
                    <li>Les éventuelles difficultés : escalier étroit, ascenseur trop petit, porte ou couloir exigu, meuble très volumineux ou très lourd</li>
                </ul>
                <p className="text-[#001964]">
                    <strong>Limites techniques :</strong> vous pouvez télécharger jusqu’à <strong>20 photos</strong> et <strong>10 vidéos</strong> pour un poids maximun de <strong>10 Mo par videos</strong>.
                </p>
                <p className="text-[#001964] mt-2">
                    Merci pour votre aide, ces informations nous permettent de vous faire un devis précis et d’organiser votre déménagement en toute sérénité.
                </p>
            </div>

            <div className="flex justify-center mt-8 md:px-8">
                <div className="p-4 border shadow-md rounded-md w-full">
                    <h1 className="text-xl font-bold mb-4">Charger une ou plusieurs photos ou videos</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block font-bold mb-2 text-sm">Photos (20 maximun)</label>
                            <Input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
                            {photos.length > 0 && (
                                <p className="text-sm mt-1">{photos.length} photo(s) sélectionnée(s)</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block font-bold mb-2 text-sm">Vidéos (10 au maximun pour 10 Mo maximum / Videos)</label>
                            <Input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
                            {videos.length > 0 && (
                                <p className="text-sm mt-1">{videos.length} vidéo(s) sélectionnée(s)</p>
                            )}
                        </div>
                    </div>

                    <Button className="bg-[#001964] hover:bg-[#001964]/90" onClick={handleSubmit} disabled={uploading}>
                        {uploading ? (
                            <>
                                <Loader className="animate-spin me-1" />
                                <span>Envoi en cours...</span>
                            </>
                        ) : (
                            <>
                                <>
                                    <Send className="me-1" />
                                    <span>Valider et Envoyer</span>
                                </></>
                        )}
                    </Button>
                </div>
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

                        {deleting ? (
                            <>
                                <Loader className="animate-spin me-1" />
                                <span>Suppression en cours...</span>
                            </>
                        ) : (
                            <>
                                <Trash className="md:me-1" />
                                <span className="hidden md:flex">Supprimer la selection</span>
                            </>
                        )}

                    </Button>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Supprimer les médias sélectionnés ?"
                description={`Vous allez supprimer ${selectedPhotos.length} photo(s) et ${selectedVideos.length} vidéo(s). Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default VirtualTour;