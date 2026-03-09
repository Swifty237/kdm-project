import { Send, Trash2 } from 'lucide-react';
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
    civility: string;
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
        contactCivility?: string;
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
            <DialogContent className="min-w-full md:min-w-[80%] h-[70%] mx-auto">
                <div className="overflow-y-auto">
                    <DialogHeader className="p-8">
                        <DialogTitle className="mb-8 text-center border-b-2 pb-8">{title}</DialogTitle>

                        <div className="space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Civilité, nom et prénom :</p>
                                    <span>{devis.civility} {devis.name}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Email :</p>
                                    <span>{devis.email}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Entreprise :</p>
                                    <span>{devis.entreprise || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8 text-start">Adresse facturation :</p>
                                    <span>{devis.billingAddress}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Téléphone :</p>
                                    <span>{devis.telephone || "-"}</span>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Service : </p>

                                    {devis.service == "Demenagement" &&
                                        <span>Déménagement</span>
                                    }

                                    {devis.service == "transport" &&
                                        <span>Transport de marchandises</span>
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Date souhaitée :</p>
                                    <span>{devis.date || "-"}</span>
                                </div>

                                {devis.service == "Demenagement" && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Formule :</p>
                                        <span>{formatOffers(devis.offer)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2 ">
                                <h4 className="text-xl font-bold">Informations au départ</h4>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.service == "Demenagement" && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Surface : </p>
                                        <span>{devis.departure.surface} m2</span>
                                    </div>
                                )}
                                {devis.service == "transport" && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Volume : </p>
                                        <span>{devis.departure.volume} m3</span>
                                    </div>
                                )}
                            </div>

                            {devis.service == "Demenagement" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Nombre de pièces : </p>
                                        <span>{devis.departure.rooms}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Numéro d'étage :</p>
                                        <span>{formatFloor(devis.departure.floor)}</span>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.departure.elevator && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Ascenceur : </p>
                                        <span>{devis.departure.elevator ? "Oui" : "Non"}</span>
                                    </div>
                                )}

                                {devis.departure.elevator && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Taille de l'ascenceur :</p>
                                        <span>{devis.departure.elevatorSize || "-"}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {Number(devis.departure.floor) > 0 && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Taille de l'escalier : </p>
                                        <span>{formatStairsSize(devis.departure.stairsSize)}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Adresse :</p>
                                    <span>{devis.departure.address}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2">
                                <h4 className="text-xl font-bold">Informations à l'arrivée</h4>
                            </div>

                            {devis.service == "Demenagement" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Numéro d'étage :</p>
                                        <span>{formatFloor(devis.arrival.floor)}</span>
                                    </div>
                                    {devis.arrival.elevator && (
                                        <div className="flex items-center">
                                            <p className="text-lg font-bold me-8">Ascenceur : </p>
                                            <span>{devis.arrival.elevator ? "Oui" : "Non"}</span>
                                        </div>
                                    )}

                                </div>
                            )}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.arrival.elevator && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Taille de l'ascenceur :</p>
                                        <span>{devis.arrival.elevatorSize || "-"}</span>
                                    </div>
                                )}

                                {Number(devis.arrival.floor) > 0 && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Taille de l'escalier : </p>
                                        <span>{formatStairsSize(devis.arrival.stairsSize)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Adresse :</p>
                                    <span>{devis.arrival.address}</span>
                                </div>

                                {devis.service == "transport" && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8 text-start">Civilité et nom du contact à l'arrivée :</p>
                                        <span>{devis.arrival.contactCivility} {devis.arrival.contactName || "-"}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="flex items-center">
                                    <p className="text-lg font-bold me-8">Entreprise : </p>
                                    <span>{devis.arrival.entreprise || "-"}</span>
                                </div>

                                {devis.service == "transport" && (
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold me-8">Date d'arrivée souhaitée :</p>
                                        <span>{devis.arrival.date || "-"}</span>
                                    </div>
                                )}
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
                    <div className="lg:flex justify-between w-[100%]">
                        <div className="flex items-center ms-6">
                            <h4 className="text-xl font-bold me-4">Montant estimé du devis : </h4>
                            <span className="text-3xl font-bold text-[#16a085]">{devis.estimatedAmount} € TTC</span>
                        </div>
                        <div className="flex justify-center lg:justify-end mt-4 gap-2">
                            <Button className="text-lg" variant="outline" onClick={onCancel}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span>{cancelText}</span>
                            </Button>
                            <Button className="text-lg bg-[#16a085] hover:bg-[#1abc9c]" variant="destructive" onClick={onConfirm}>
                                <Send className="h-4 w-4 mr-1" />
                                <span>{confirmText}</span>
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDevisDialog;
