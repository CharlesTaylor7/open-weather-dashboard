import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useAppState = create(
  combine(
    {
      forecasts: [] as Array<CityForecast>,
    },
    (set, get) => ({
      appendForecast: (city: CityForecast) =>
        set({
          forecasts: [...get().forecasts, city],
        }),
      removeForecast: (index: number) => {
        const copy = Array.from(get().forecasts);
        // splice deletes and shifts elements in place
        copy.splice(index, 1);
        set({ forecasts: copy });
      },
    }),
  ),
);
export type View = "chart" | "table";

export type CityForecast = {
  label: string;
  forecast: Array<{
    datetime: Date;
    temperature: number;
  }>;
};
