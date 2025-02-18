import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../api/types";
import { weatherAPI } from "../api/weather";


export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (query: string) => ["searchLocation", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useForecastQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useReverseGeoQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.getReverseGeo(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useSearchLocation(query: string){
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => weatherAPI.searchLocation(query),
        enabled: query.length >= 3,
    })
}