import ForecastChart from "@/components/ForecastChart";
import CitySearch from "@/components/CitySearch";
import CityPillList from "@/components/CityBadgeList";
import Map from "@/components/Map";

export default function App() {
  return (
    <main data-theme="dark" className="flex h-screen w-full justify-center">
      <div className="w-4/5 md:w-2/3 flex flex-col gap-5 m-5 items-start">
        <header className="w-full text-center bold text-2xl">
          Weather Dashboard
        </header>
        <Map />
        <CitySearch />
        <CityPillList />
        <ForecastChart />
      </div>
    </main>
  );
}
