import { useEffect, useState } from "react";
import { Coordinates } from "../api/types";

interface GeolocationState{
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeoloaction(){

    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {

        setLocationData(prev => ({...prev, isLoading: false, error: null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geoloaction is not supported by your browser...",
                isLoading: false
            })
            return;
        }

        navigator.geolocation.getCurrentPosition((position) =>{
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (error) => {
            let errorMessage :string;

            switch (error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location permission denied. Please enable location access.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break
                default:
                    errorMessage = 'An unknown error occured.';
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            });
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation
    }

};