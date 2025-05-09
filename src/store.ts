import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
// https://immerjs.github.io/immer/installation#pick-your-immer-version
enableMapSet();

export const useAppState = create(
  immer(
    combine(
      {
        forecasts: new Map<string, Forecast>(),
        locations: [] as Array<Location>,
      },
      (set) => ({
        removeLocationByIndex(index: number) {
          set((state) => {
            state.locations.splice(index, 1);
          });
        },
        removeLocation(location: Location) {
          set((state) => {
            const index = state.locations.findIndex(
              (loc) => toKey(loc.coordinates) == toKey(location.coordinates),
            );
            state.locations.splice(index, 1);
          });
        },
        addLocation(location: Location) {
          set((state) => {
            state.locations.push(location);
          });
        },

        setLabel(location: Location) {
          set((state) => {
            const loc = state.locations.find(
              (loc) => toKey(loc.coordinates) == toKey(location.coordinates),
            );
            if (!loc) {
              console.error("can't find location");
            } else {
              loc.label = location.label;
            }
          });
        },

        saveForecast(coordinates: Coordinates, forecast: Forecast) {
          set((state) => {
            state.forecasts.set(toKey(coordinates), forecast);
          });
        },
      }),
    ),
  ),
);

export function toKey(coordinates: Coordinates) {
  return `${coordinates.lat},${coordinates.lon}`;
}
export type View = "chart" | "table";

export type Forecast = Array<{
  datetime: Date;
  temperature: number;
}>;

export interface CityForecast {
  label: string;
  forecast: Forecast;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
export interface Location {
  label?: string;
  coordinates: Coordinates;
}
