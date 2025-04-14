import Pill from "@/components/Pill";
import { useAppState } from "@/store";

export default function CityPillList() {
  const { forecasts: cities, removeForecast: removeCity } = useAppState();
  return (
    <div className="flex flex-wrap  gap-2">
      {cities.map((city, index) => (
        <Pill
          key={index}
          label={city.label}
          onClickRemove={() => removeCity(index)}
        />
      ))}
    </div>
  );
}
