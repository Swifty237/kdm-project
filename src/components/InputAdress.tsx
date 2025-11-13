import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

const libraries: ("places")[] = ["places"];

interface InputAdressProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string;
    onChange: (value: string) => void;
}

export default function InputAdress({
    value,
    onChange,
    placeholder,
    ...rest
}: InputAdressProps) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (!isLoaded) return <Input disabled placeholder="Chargement de Google..." />;

    const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
            onChange(place.formatted_address);
        }
    };

    return (
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Saisissez une adresse"}
                {...rest}
            />
        </Autocomplete>
    );
}
