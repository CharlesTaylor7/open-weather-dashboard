import Badge from "@/components/Badge";
import { useAppState } from "@/store";

export default function CityBadgeList() {
  const { locations, removeLocationByIndex } = useAppState();
  return (
    <div className="flex flex-wrap  gap-2">
      {locations
        .filter((loc) => loc.label)
        .map((city, index) => (
          <Badge
            key={index}
            label={city.label!}
            onClickRemove={() => removeLocationByIndex(index)}
          />
        ))}
    </div>
  );
}
