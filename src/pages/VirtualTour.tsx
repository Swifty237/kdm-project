/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Send, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConfirmDialog from '@/components/ConfirmDialog';
import imageCompression from 'browser-image-compression';

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
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const { toast } = useToast();
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [deleting, setDeleting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const photoInputRef = useRef<HTMLInputElement>(null);

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

    // Modifie la fonction handleDelete pour ouvrir le dialogue
    const handleDelete = () => {
        if (selectedPhotos.length === 0) return;   // plus de videos
        setConfirmOpen(true);
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
                })
            });
            if (res.ok) {
                const reload = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
                const reloadData = await reload.json();
                if (reload.ok) setDevis(reloadData);
                setSelectedPhotos([]);
                toast({
                    description: "Suppression réussie !",
                    className: "bg-green-600 text-white border-none",
                });

            } else {
                const data = await res.json();
                toast({
                    title: "Erreur lors de la suppression",
                    description: data.error,
                    variant: "destructive"
                });
            }
        } catch (err) {
            console.error("Erreur réseau:", err);
            toast({
                title: "Erreur réseau",
                description: "Une erreur est survenue lors de la suppression",
                variant: "destructive"
            });
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
            return;
        }
        setPhotos(prev => [...prev, ...files]);
    };

    // Nouvelle fonction : upload d'une seule photo (compressée) via URL pré-signée
    const uploadSinglePhoto = async (file: File, token: string): Promise<string> => {
        const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
        // 1. Compression
        const options = {
            maxSizeMB: 0.5,          // taille max 0.5 Mo par photo
            maxWidthOrHeight: 1920,  // résolution max 1920px
            useWebWorker: true,
            fileType: 'image/jpeg',
        };
        let compressedFile = file;
        if (file.size > 1024 * 1024) { // si > 1 Mo, on compresse
            compressedFile = await imageCompression(file, options);
        }

        // 2. Demander une URL pré-signée au backend
        const signRes = await fetch(`${API_URL}/api/devis/virtual-tour/${token}/sign-photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: compressedFile.name,
                fileType: compressedFile.type,
            }),
        });
        if (!signRes.ok) {
            const err = await signRes.json();
            throw new Error(err.error || "Erreur signature");
        }
        const { signedUrl, finalUrl } = await signRes.json();

        // 3. Upload direct vers S3
        const uploadRes = await fetch(signedUrl, {
            method: 'PUT',
            body: compressedFile,
            headers: { 'Content-Type': compressedFile.type },
        });
        if (!uploadRes.ok) {
            throw new Error("Échec de l'upload vers S3");
        }

        // 4. Retourner l'URL finale (publique)
        return finalUrl;
    };

    const handleSubmit = async () => {
        if (photos.length === 0) {
            toast({ title: "Attention !", description: "Sélectionnez au moins une photo.", variant: "destructive" });
            return;
        }

        setUploading(true);
        const API_URL = import.meta.env.VITE_KDM_SERVER_URI;

        try {
            const uploadedUrls: string[] = [];

            // Upload séquentiel (ou parallèle avec Promise.all, mais attention aux limites de connexion)
            for (const photo of photos) {
                const url = await uploadSinglePhoto(photo, token!);
                uploadedUrls.push(url);
            }

            // Confirmation au backend : enregistrer toutes ces URLs
            const confirmRes = await fetch(`${API_URL}/api/devis/virtual-tour/${token}/confirm-upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photoUrls: uploadedUrls }),
            });

            if (!confirmRes.ok) {
                const errData = await confirmRes.json();
                throw new Error(errData.error || "Erreur lors de l'enregistrement");
            }

            // Recharger les données du devis
            const reloadRes = await fetch(`${API_URL}/api/devis/virtual-tour/${token}`);
            const reloadData = await reloadRes.json();
            if (reloadRes.ok) setDevis(reloadData);

            // Réinitialiser l'état
            setPhotos([]);
            if (photoInputRef.current) photoInputRef.current.value = '';

            toast({
                description: `${uploadedUrls.length} photo(s) envoyée(s) avec succès !`,
                className: "bg-green-600 text-white border-none",
            });

        } catch (err) {
            console.error("Erreur upload :", err);
            toast({
                title: "Erreur lors de l'upload",
                description: err.message || "Une erreur est survenue",
                variant: "destructive"
            });
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

            <div className="mb-6 p-4 bg-[#ecf0f1] border border-[#ecf0f1] rounded-sm shadow-xl text-justify">
                <h3 className="text-lg font-semibold text-[#001964] mb-2">
                    📸 Conseils pour des photos utiles
                </h3>
                <p className="text-[#001964] mb-2">
                    Pour que nous puissions préparer votre déménagement dans les meilleures conditions,
                    merci de bien vouloir nous fournir des photos des éléments suivants :
                </p>
                <ul className="list-disc list-inside text-[#001964] space-y-1 mb-3 ml-2">
                    <li>Chaque pièce à déménager (angle large de préférence)</li>
                    <li>L’emplacement de parking potentiel pour le camion (vue depuis la rue, signaler si zone très passante ou réglementée)</li>
                    <li>Les éventuelles difficultés : escalier étroit, ascenseur trop petit, porte ou couloir exigu, meuble très volumineux ou très lourd</li>
                </ul>
                <p className="text-[#001964]">
                    <strong>Limites techniques :</strong> vous pouvez télécharger jusqu’à <strong>20 photos</strong> au maximum.
                </p>
                <p className="text-[#001964] mt-2">
                    Merci pour votre aide, ces informations nous permettent de vous faire un devis précis et d’organiser votre déménagement en toute sérénité.
                </p>
            </div>

            <div className="flex justify-center mt-8 md:px-8">
                <div className="p-4 border shadow-md rounded-md w-full">
                    <h1 className="text-xl font-bold mb-2">Charger une ou plusieurs photos (20 au maximum)</h1>

                    <div className="mb-4">
                        <Input
                            ref={photoInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hover:cursor-pointer hover:border-2 hover:border-black transition-colors"
                        />
                        {photos.length > 0 && <p className="text-sm mt-1">{photos.length} photo(s) sélectionnée(s)</p>}
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
            </div>

            {(devis.virtualTourPhotos?.length > 0) && (
                <div className="mt-8 flex justify-between items-center">
                    <span>Selectionnez les éléments que vous souhaitez supprimer.</span>
                    <Button
                        className="bg-red-500 hover:bg-red-500/90 mb-4"
                        onClick={handleDelete}
                        disabled={deleting || (selectedPhotos.length === 0)}
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
                description={`Vous allez supprimer ${selectedPhotos.length} photo(s). Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default VirtualTour;