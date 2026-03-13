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
                    <DialogHeader className="py-8 pb-8">
                        <div className="mb-8 text-center border-b-2">
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription className="mt-3">{description}</DialogDescription>
                        </div>

                        <div className="space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Civilité, nom et prénom :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.civility} {devis.name}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Email :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.email}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Entreprise :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.entreprise || "-"}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start text-start">Adresse facturation :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.billingAddress}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Téléphone :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.telephone || "-"}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Service : </p>

                                    {devis.service == "Demenagement" &&
                                        <span className=" max-w-[75%] md:max-w-full">Déménagement</span>
                                    }

                                    {devis.service == "transport" &&
                                        <span className=" max-w-[75%] md:max-w-full">Transport de marchandises</span>
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Date souhaitée :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.date || "-"}</span>
                                </div>

                                {devis.service == "Demenagement" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Formule :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{formatOffers(devis.offer)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2 ">
                                <h4 className="text-xl font-bold text-start">Informations au départ</h4>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.service == "Demenagement" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Surface : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.departure.surface} m2</span>
                                    </div>
                                )}
                                {devis.service == "transport" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Volume : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.departure.volume} m3</span>
                                    </div>
                                )}
                            </div>

                            {devis.service == "Demenagement" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Nombre de pièces : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.departure.rooms}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Numéro d'étage :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{formatFloor(devis.departure.floor)}</span>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.departure.elevator && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Ascenceur : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.departure.elevator ? "Oui" : "Non"}</span>
                                    </div>
                                )}

                                {devis.departure.elevator && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Taille de l'ascenceur :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.departure.elevatorSize || "-"}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {Number(devis.departure.floor) > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Taille de l'escalier : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{formatStairsSize(devis.departure.stairsSize)}</span>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Adresse :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.departure.address}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2">
                                <h4 className="text-xl font-bold text-start">Informations à l'arrivée</h4>
                            </div>

                            {devis.service == "Demenagement" && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Numéro d'étage :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{formatFloor(devis.arrival.floor)}</span>
                                    </div>
                                    {devis.arrival.elevator && (
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <p className="text-lg font-bold text-start">Ascenceur : </p>
                                            <span className=" max-w-[75%] md:max-w-full">{devis.arrival.elevator ? "Oui" : "Non"}</span>
                                        </div>
                                    )}

                                </div>
                            )}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                {devis.arrival.elevator && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Taille de l'ascenceur :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.arrival.elevatorSize || "-"}</span>
                                    </div>
                                )}

                                {Number(devis.arrival.floor) > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Taille de l'escalier : </p>
                                        <span className=" max-w-[75%] md:max-w-full">{formatStairsSize(devis.arrival.stairsSize)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Adresse :</p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.arrival.address}</span>
                                </div>

                                {devis.service == "transport" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start text-start">Civilité et nom du contact à l'arrivée :</p>
                                        <span className=" max-w-[75%] md:max-w-full">{devis.arrival.contactCivility} {devis.arrival.contactName || "-"}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <p className="text-lg font-bold text-start">Entreprise : </p>
                                    <span className=" max-w-[75%] md:max-w-full">{devis.arrival.entreprise || "-"}</span>
                                </div>

                                {/* {devis.service == "transport" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <p className="text-lg font-bold text-start">Date d'arrivée souhaitée :</p>
                                        <span className="mt-2">{devis.arrival.date || "-"}</span>
                                    </div>
                                )} */}
                            </div>
                            <div className="grid grid-cols-1 h-2"></div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4 border-b-2">
                                <h4 className="text-xl font-bold text-start">Informations supplémentaires</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-3 lg:gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <span className="mt-2 max-w-[75%] md:max-w-full">{devis.message || "-"}</span>
                                </div>


                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <DialogFooter className="p-4 rounded-lg bg-[#ecf0f1]">
                    <div className="lg:flex justify-between w-[100%]">
                        <div className="flex items-center">
                            <h4 className="text-xl font-bold me-4">Montant de l'estimation : </h4>
                            <span className="text-3xl font-bold text-[#16a085]">{devis.estimatedAmount} € TTC</span>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:justify-end mt-4 gap-2">
                            <Button className="text-lg shadow-lg" variant="outline" onClick={onCancel}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span>{cancelText}</span>
                            </Button>
                            <Button className="text-lg bg-[#16a085] hover:bg-[#1abc9c] shadow-lg" variant="destructive" onClick={onConfirm}>
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
