import type { Theatre } from "@/data/theatres";

export type LatLngTuple = [number, number];

export const CITY_CENTERS: Record<string, LatLngTuple> = {
  Trichy: [10.7905, 78.7047],
  Thanjavur: [10.7867, 79.1378],
};

export const THEATRE_COORDS: Record<string, LatLngTuple> = {
  t1: [10.8226, 78.6997],
  t2: [10.8263, 78.6928],
  t3: [10.7908, 78.6909],
  t4: [10.8019, 78.6882],
  t5: [10.8048, 79.1161],
  t6: [10.7878, 79.1324],
  t7: [10.7839, 79.1334],
  t8: [10.7832, 79.1252],
  t9: [10.7887, 79.1336],
  t10: [10.7842, 79.1371],
};

const hashId = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const fallbackCoordsForTheatre = (theatre: Theatre): LatLngTuple => {
  const cityCenter = CITY_CENTERS[theatre.city] ?? [10.7905, 78.7047];
  const seed = hashId(theatre.id);
  const latOffset = ((seed % 17) - 8) * 0.0025;
  const lngOffset = ((Math.floor(seed / 17) % 17) - 8) * 0.0025;
  return [cityCenter[0] + latOffset, cityCenter[1] + lngOffset];
};

export const getTheatreCoords = (theatre: Theatre): LatLngTuple => {
  return THEATRE_COORDS[theatre.id] ?? fallbackCoordsForTheatre(theatre);
};

export const getMapCenter = (positions: LatLngTuple[], city: string): LatLngTuple => {
  if (positions.length === 0) {
    return CITY_CENTERS[city] ?? [10.7905, 78.7047];
  }

  const [latSum, lngSum] = positions.reduce(
    (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng],
    [0, 0],
  );

  return [latSum / positions.length, lngSum / positions.length];
};