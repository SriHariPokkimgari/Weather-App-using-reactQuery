import { useFavoriteCity } from "../hooks/use-favoriteCity";
import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  const { favorites } = useFavoriteCity();

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {favorites.map((fav) => (
          <Skeleton id={fav.id} className="h-[75px] min-w-[250px] rounded-lg" />
        ))}
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
