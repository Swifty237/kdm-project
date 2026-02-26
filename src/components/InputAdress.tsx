import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";

const libraries: ("places")[] = ["places"];

interface InputAdressProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string;
    onChange: (value: string) => void;
    onValidAddress?: (isValid: boolean) => void; // Optionnel : pour remonter la validité au parent
}

export default function InputAdress({
    value,
    onChange,
    placeholder,
    onValidAddress,
    ...rest
}: InputAdressProps) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isValidAddress, setIsValidAddress] = useState(false);
    const [hasSelectedFromAutocomplete, setHasSelectedFromAutocomplete] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    // Notifier le parent du changement de validité si la prop est fournie
    useEffect(() => {
        if (onValidAddress) {
            onValidAddress(isValidAddress);
        }
    }, [isValidAddress, onValidAddress]);

    if (!isLoaded) return <Input disabled placeholder="Chargement de Google..." />;

    const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;

        // Configuration pour restreindre aux adresses complètes
        autocomplete.setFields(['formatted_address', 'address_components']);
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();

        // Vérifier qu'on a bien une adresse formatée (signe qu'une vraie adresse a été sélectionnée)
        if (place && place.formatted_address) {
            setHasSelectedFromAutocomplete(true);
            setIsValidAddress(true);
            onChange(place.formatted_address);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Si l'utilisateur modifie le champ après avoir sélectionné une adresse,
        // on réinitialise le flag de sélection
        if (hasSelectedFromAutocomplete) {
            setHasSelectedFromAutocomplete(false);
            setIsValidAddress(false);
        }

        onChange(newValue);
    };

    const handleBlur = () => {
        // Validation au départ du champ
        if (!hasSelectedFromAutocomplete && value.trim() !== '') {
            // Option 1: Adresse invalide car non sélectionnée via autocomplete
            setIsValidAddress(false);

            // Option 2: Si vous voulez quand même accepter les adresses tapées manuellement
            // mais avec une validation stricte du format, vous pouvez implémenter
            // une validation plus poussée ici

        } else if (value.trim() === '') {
            setIsValidAddress(false);
        }
    };

    // Déterminer la classe CSS en fonction de la validité
    const inputClassName = `${value && !isValidAddress && !hasSelectedFromAutocomplete
            ? 'border-yellow-500 focus-visible:ring-yellow-500'
            : isValidAddress
                ? 'border-green-500 focus-visible:ring-green-500'
                : ''
        } ${rest.className || ''}`;

    return (
        <div className="relative">
            <Autocomplete
                onLoad={handleLoad}
                onPlaceChanged={handlePlaceChanged}
                options={{
                    // Optionnel: restreindre aux adresses uniquement
                    types: ['address'],
                    // Optionnel: restreindre à un pays (ex: France)
                    componentRestrictions: { country: 'fr' },
                }}
            >
                <Input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder={placeholder || "Saisissez une adresse"}
                    className={inputClassName}
                    {...rest}
                />
            </Autocomplete>

            {/* Indicateur visuel de validité */}
            {value && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidAddress ? (
                        <span className="text-green-500 text-sm">✓</span>
                    ) : (
                        !hasSelectedFromAutocomplete && (
                            <span className="text-yellow-500 text-sm" title="Veuillez sélectionner une adresse dans la liste">
                                ⚠
                            </span>
                        )
                    )}
                </div>
            )}
        </div>
    );
}