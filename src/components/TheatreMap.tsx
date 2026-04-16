import { Link } from "react-router-dom";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Theatre } from "@/data/theatres";
import { getMapCenter, getTheatreCoords } from "@/lib/theatreGeo";

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface TheatreMapProps {
  theatres: Theatre[];
  selectedCity: string;
}

const TheatreMap = ({ theatres, selectedCity }: TheatreMapProps) => {
  const markers = theatres.map((theatre) => ({
    theatre,
    coords: getTheatreCoords(theatre),
  }));

  const mapCenter = getMapCenter(
    markers.map((marker) => marker.coords),
    selectedCity,
  );

  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="font-display text-lg font-semibold">Theatres on Map</h2>
        <p className="text-sm text-muted-foreground">Free OpenStreetMap tiles via Leaflet</p>
      </div>
      <div className="h-[360px] w-full">
        <MapContainer center={mapCenter} zoom={12} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(({ theatre, coords }) => (
            <Marker key={theatre.id} position={coords} icon={defaultMarkerIcon}>
              <Popup>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{theatre.name}</p>
                  <p className="text-xs text-muted-foreground">{theatre.location}</p>
                  <Link className="text-xs font-semibold text-primary" to={`/theatre/${theatre.id}`}>
                    View theatre details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default TheatreMap;