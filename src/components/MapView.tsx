import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Исправляем иконки Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Location {
  id: number;
  name: string;
  type: "roof" | "bunker" | "abandoned" | "underground";
  coordinates: [number, number];
  rating: number;
  photos: number;
  isPrivate: boolean;
  description: string;
}

// Локации в Брянске и области
const mockLocations: Location[] = [
  {
    id: 1,
    name: "Крыша БМЗ (Брянский машиностроительный завод)",
    type: "roof",
    coordinates: [53.2434, 34.3656],
    rating: 4.8,
    photos: 12,
    isPrivate: false,
    description: "Отличный вид на промышленную зону города",
  },
  {
    id: 2,
    name: "Заброшенный цех завода 'Термотрон'",
    type: "abandoned",
    coordinates: [53.2521, 34.3742],
    rating: 4.2,
    photos: 8,
    isPrivate: true,
    description: "Старое промышленное здание с интересной архитектурой",
  },
  {
    id: 3,
    name: "Бункер времен ВОВ в Партизанской слободе",
    type: "bunker",
    coordinates: [53.2897, 34.2456],
    rating: 4.9,
    photos: 15,
    isPrivate: true,
    description: "Исторический объект периода Великой Отечественной войны",
  },
  {
    id: 4,
    name: "Подземные ходы центра Брянска",
    type: "underground",
    coordinates: [53.2434, 34.3656],
    rating: 4.1,
    photos: 6,
    isPrivate: false,
    description: "Система подземных коммуникаций исторического центра",
  },
  {
    id: 5,
    name: "Крыша гостиницы 'Чернигов'",
    type: "roof",
    coordinates: [53.2467, 34.3741],
    rating: 4.5,
    photos: 9,
    isPrivate: false,
    description: "Панорамный вид на реку Десна и центр города",
  },
  {
    id: 6,
    name: "Заброшенная дача в Супоневе",
    type: "abandoned",
    coordinates: [53.2156, 34.4234],
    rating: 3.8,
    photos: 4,
    isPrivate: false,
    description: "Старое дачное строение в пригороде",
  },
];

const typeConfig = {
  roof: { color: "bg-orange-500", icon: "Building", label: "Крыша" },
  bunker: { color: "bg-gray-600", icon: "Shield", label: "Бункер" },
  abandoned: { color: "bg-yellow-600", icon: "Home", label: "Заброшка" },
  underground: { color: "bg-blue-600", icon: "Zap", label: "Подземелье" },
};

// Создаем кастомные иконки для разных типов локаций
const createCustomIcon = (type: string) => {
  const colors = {
    roof: "#f97316",
    bunker: "#6b7280",
    abandoned: "#eab308",
    underground: "#3b82f6",
  };

  return L.divIcon({
    html: `<div style="background-color: ${colors[type as keyof typeof colors]}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("all");

  const filteredLocations =
    filter === "all"
      ? mockLocations
      : mockLocations.filter((loc) => loc.type === filter);

  return (
    <div className="h-screen flex">
      {/* Карта */}
      <div className="flex-1 relative">
        <MapContainer
          center={[53.2434, 34.3656]} // Центр Брянска
          zoom={11}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.coordinates}
              icon={createCustomIcon(location.type)}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold text-sm mb-2">
                    {location.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {location.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      ⭐ {location.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      📸 {location.photos} фото
                    </span>
                    {location.isPrivate && (
                      <span className="text-orange-600">🔒 VIP</span>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Детали выбранной локации */}
        {selectedLocation && (
          <Card className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 p-4 z-10">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLocation(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {selectedLocation.description}
              </p>

              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={typeConfig[selectedLocation.type].color}
                >
                  <Icon
                    name={typeConfig[selectedLocation.type].icon as any}
                    size={12}
                    className="mr-1"
                  />
                  {typeConfig[selectedLocation.type].label}
                </Badge>
                {selectedLocation.isPrivate && (
                  <Badge variant="outline">
                    <Icon name="Lock" size={12} className="mr-1" />
                    Приватная
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-500" />
                  {selectedLocation.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Camera" size={14} />
                  {selectedLocation.photos} фото
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="Navigation" size={14} className="mr-1" />
                  Маршрут
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Heart" size={14} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share" size={14} />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Боковая панель фильтров */}
      <div className="w-80 bg-card border-l border-border p-4 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Фильтры</h2>

          <div className="space-y-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("all")}
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              Все места ({mockLocations.length})
            </Button>

            {Object.entries(typeConfig).map(([type, config]) => {
              const count = mockLocations.filter(
                (loc) => loc.type === type,
              ).length;
              return (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setFilter(type)}
                >
                  <Icon name={config.icon as any} size={16} className="mr-2" />
                  {config.label} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-medium mb-3">Рейтинг</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                className="w-full justify-start text-sm"
              >
                <div className="flex items-center gap-1 mr-2">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
                от {rating} звезд
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button className="w-full">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить место
          </Button>
        </div>
      </div>
    </div>
  );
}
