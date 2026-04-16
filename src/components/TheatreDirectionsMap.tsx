import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { Navigation, MapPin, Clock3, Route } from "lucide-react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Theatre } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { getTheatreCoords, type LatLngTuple } from "@/lib/theatreGeo";

type RouteInfo = {
  geometry: LatLngTuple[];
  durationSeconds: number;
  distanceMeters: number;
};

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userMarkerIcon = L.divIcon({
  className: "",
  html: '<div style="height:18px;width:18px;border-radius:9999px;background:#2563eb;border:3px solid #bfdbfe;box-shadow:0 0 0 2px rgba(37,99,235,.2)"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`;

const formatDuration = (seconds: number) => {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  return `${hours}h ${minutes}m`;
};

const TheatreDirectionsMap = ({ theatre }: { theatre: Theatre }) => {
  const theatreCoords = useMemo(() => getTheatreCoords(theatre), [theatre]);
  const [userCoords, setUserCoords] = useState<LatLngTuple | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not available in this browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission was denied. Enable it to get live directions.");
          return;
        }
        setLocationError("Unable to get your location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    requestUserLocation();
  }, []);

  useEffect(() => {
    if (!userCoords) {
      setRouteInfo(null);
      return;
    }

    const controller = new AbortController();

    const fetchRoute = async () => {
      setIsRouting(true);
      setRouteError(null);

      try {
        const from = `${userCoords[1]},${userCoords[0]}`;
        const to = `${theatreCoords[1]},${theatreCoords[0]}`;
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from};${to}?overview=full&geometries=geojson`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch route");
        }

        const data = (await response.json()) as {
          routes?: Array<{
            distance: number;
            duration: number;
            geometry: { coordinates: Array<[number, number]> };
          }>;
        };

        const route = data.routes?.[0];
        if (!route) {
          throw new Error("No route found");
        }

        const latLngGeometry = route.geometry.coordinates.map(
          ([lng, lat]) => [lat, lng] as LatLngTuple,
        );

        setRouteInfo({
          geometry: latLngGeometry,
          durationSeconds: route.duration,
          distanceMeters: route.distance,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setRouteInfo(null);
        setRouteError("Could not load route right now. You can still open external navigation.");
      } finally {
        setIsRouting(false);
      }
    };

    fetchRoute();

    return () => {
      controller.abort();
    };
  }, [theatreCoords, userCoords]);

  const mapCenter = userCoords ?? theatreCoords;
  const googleDirectionsUrl = userCoords
    ? `https://www.google.com/maps/dir/${userCoords[0]},${userCoords[1]}/${theatreCoords[0]},${theatreCoords[1]}`
    : `https://www.google.com/maps/search/?api=1&query=${theatreCoords[0]},${theatreCoords[1]}`;

  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Directions to {theatre.name}</h2>
          <p className="text-sm text-muted-foreground">Live route and ETA from your location</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={requestUserLocation} disabled={isLocating}>
            <Navigation className="mr-1 h-4 w-4" />
            {isLocating ? "Locating..." : "Use My Location"}
          </Button>
          <Button asChild size="sm">
            <a href={googleDirectionsUrl} target="_blank" rel="noreferrer">
              Open External Navigation
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 border-b border-border px-4 py-3 text-sm md:grid-cols-3">
        <div className="rounded-md bg-secondary/40 p-3">
          <p className="mb-1 text-xs text-muted-foreground">Distance</p>
          <p className="font-semibold">
            {routeInfo ? formatDistance(routeInfo.distanceMeters) : isRouting ? "Calculating..." : "-"}
          </p>
        </div>
        <div className="rounded-md bg-secondary/40 p-3">
          <p className="mb-1 text-xs text-muted-foreground">ETA (Driving)</p>
          <p className="font-semibold">
            {routeInfo ? formatDuration(routeInfo.durationSeconds) : isRouting ? "Calculating..." : "-"}
          </p>
        </div>
        <div className="rounded-md bg-secondary/40 p-3">
          <p className="mb-1 text-xs text-muted-foreground">Status</p>
          <p className="font-semibold">
            {userCoords ? (isRouting ? "Finding best route..." : "Route ready") : "Waiting for location"}
          </p>
        </div>
      </div>

      {(locationError || routeError) && (
        <div className="border-b border-border bg-destructive/5 px-4 py-2 text-sm text-destructive">
          {locationError ?? routeError}
        </div>
      )}

      <div className="h-[380px] w-full">
        <MapContainer center={mapCenter} zoom={14} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={theatreCoords} icon={defaultMarkerIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{theatre.name}</p>
                <p className="text-xs text-muted-foreground">{theatre.location}</p>
              </div>
            </Popup>
          </Marker>

          {userCoords && (
            <Marker position={userCoords} icon={userMarkerIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {routeInfo && <Polyline positions={routeInfo.geometry} pathOptions={{ color: "#2563eb", weight: 5 }} />}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Theatre marker</span>
        <span className="inline-flex items-center gap-1"><Route className="h-3.5 w-3.5" /> Live route line</span>
        <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> ETA based on current route profile</span>
      </div>
    </section>
  );
};

export default TheatreDirectionsMap;