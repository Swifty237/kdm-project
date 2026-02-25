// src/components/ConfirmDevisDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Devis {
    _id?: string;
    name?: string;
    email?: string;
    entreprise?: string;
    telephone?: string;
    service?: string;
    offer?: string;
    billingAddress?: string;
    devisNumber?: string;
    message?: string;
    distance?: string;
    estimatedAmount: string;
    finalAmount: string;
    date?: string;
    departure?: {
        surface?: string;
        volume?: string;
        rooms?: string;
        floor?: string;
        elevator?: boolean;
        elevatorSize?: string;
        stairsSize?: string;
        address?: string;
    };
    arrival?: {
        floor?: string;
        elevator?: boolean;
        elevatorSize?: string;
        stairsSize?: string;
        address?: string;
        contactName?: string;
        entreprise?: string;
        date?: string;
    };
    createdAt?: string;
}

interface ConfirmDevisDialogProps {
    open: boolean;
    devis?: Partial<Devis>;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDevisDialog = ({
    open,
    devis,
    title = "Récapitulatif de la demande",
    description = "Souhaitez-vous valider la demande de devis ?",
    confirmText = "Validez et envoyez",
    cancelText = "Annulez la demande",
    onConfirm,
    onCancel,
}: ConfirmDevisDialogProps) => {

    const formatFloor = (floor: string | number | undefined) => {
        if (!floor || floor === "0" || floor === 0) return "Rez de chaussée";
        return floor;
    };

    // Fonction utilitaire pour convertir stairsSize
    const formatOffers = (offer: string) => {
        switch (offer) {
            case "economique":
                return "Économique";
            case "standard":
                return "Standard";
            case "premium":
                return "Premium";
            case "premium+":
                return "Premium +";
            default:
                return "-"; // si valeur inconnue
        }
    };

    // Fonction utilitaire pour convertir stairsSize
    const formatStairsSize = (size: string) => {
        switch (size) {
            case "small":
                return "Petit";
            case "average":
                return "Moyen";
            case "wide":
                return "Large";
            default:
                return "-"; // si valeur inconnue
        }
    };

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="min-w-full md:min-w-[70%] h-[70%] mx-auto">
                <div className="overflow-y-auto">
                    <DialogHeader className="p-8">
                        <DialogTitle className="mb-8 text-center border-b-2 pb-8">{title}</DialogTitle>

                        <div className="space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Nom complet :</p>
                                    <span>{devis.name}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Email :</p>
                                    <span>{devis.email}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Entreprise :</p>
                                    <span>{devis.entreprise || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Adresse de facturation :</p>
                                    <span>{devis.billingAddress}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Téléphone :</p>
                                    <span>{devis.telephone || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Service : </p>
                                    <span>{devis.service}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Date :</p>
                                    <span>{devis.date || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Formule :</p>
                                    <span>{formatOffers(devis.offer)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2 ">
                                <h4 className="text-xl font-bold">Informations au départ</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Surface : </p>
                                    <span>{devis.departure.surface} m2</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Volume : </p>
                                    <span>{devis.departure.volume} m3</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Nombre de pièces : </p>
                                    <span>{devis.departure.rooms}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Numéro d'étage :</p>
                                    <span>{formatFloor(devis.departure.floor)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Ascenceur : </p>
                                    <span>{devis.departure.elevator ? "Oui" : "Non"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Taille de l'ascenceur :</p>
                                    <span>{devis.departure.elevatorSize || "-"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Taille de l'escalier : </p>
                                    <span>{formatStairsSize(devis.departure.stairsSize)}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Adresse :</p>
                                    <span>{devis.departure.address}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2">
                                <h4 className="text-xl font-bold">Informations à l'arrivée</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Numéro d'étage :</p>
                                    <span>{formatFloor(devis.arrival.floor)}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Ascenceur : </p>
                                    <span>{devis.arrival.elevator ? "Oui" : "Non"}</span>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Taille de l'ascenceur :</p>
                                    <span>{devis.arrival.elevatorSize || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Taille de l'escalier : </p>
                                    <span>{formatStairsSize(devis.arrival.stairsSize)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Adresse :</p>
                                    <span>{devis.arrival.address}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Nom du contact à l'arrivée :</p>
                                    <span>{devis.arrival.contactName || "-"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Entreprise : </p>
                                    <span>{devis.arrival.entreprise || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Date :</p>
                                    <span>{devis.arrival.date || "-"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2">
                                <h4 className="text-xl font-bold">Informations supplémentaires</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <span>{devis.message || "-"}</span>
                                </div>


                            </div>
                        </div>

                        <DialogDescription className="mt-3">{description}</DialogDescription>
                    </DialogHeader>
                </div>

                <DialogFooter className="mt-4">
                    <div className="flex justify-between w-[100%]">
                        <div className="flex items-center">
                            <h4 className="text-xl font-bold me-4">Montant estimé du devis : </h4>
                            <span className="text-3xl font-bold text-green-500">{devis.estimatedAmount} € TTC</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button className="text-lg" variant="outline" onClick={onCancel}>
                                {cancelText}
                            </Button>
                            <Button className="text-lg" variant="destructive" onClick={onConfirm}>
                                {confirmText}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDevisDialog;
