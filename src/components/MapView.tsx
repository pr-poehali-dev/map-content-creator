import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Location {
  id: number;
  name: string;
  type: "roof" | "bunker" | "abandoned" | "underground";
  coordinates: [number, number];
  rating: number;
  photos: number;
  isPrivate: boolean;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: "Крыша БЦ Высоцкий",
    type: "roof",
    coordinates: [56.8431, 60.6454],
    rating: 4.8,
    photos: 12,
    isPrivate: false,
  },
  {
    id: 2,
    name: "Заброшенный завод",
    type: "abandoned",
    coordinates: [56.8506, 60.6127],
    rating: 4.2,
    photos: 8,
    isPrivate: true,
  },
  {
    id: 3,
    name: "Бункер СССР",
    type: "bunker",
    coordinates: [56.8311, 60.6411],
    rating: 4.9,
    photos: 15,
    isPrivate: true,
  },
  {
    id: 4,
    name: "Подземный коллектор",
    type: "underground",
    coordinates: [56.8398, 60.6358],
    rating: 4.1,
    photos: 6,
    isPrivate: false,
  },
];

const typeConfig = {
  roof: { color: "bg-orange-500", icon: "Building", label: "Крыша" },
  bunker: { color: "bg-gray-600", icon: "Shield", label: "Бункер" },
  abandoned: { color: "bg-yellow-600", icon: "Home", label: "Заброшка" },
  underground: { color: "bg-blue-600", icon: "Zap", label: "Подземелье" },
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
      <div className="flex-1 relative bg-slate-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="Map" size={64} className="text-primary mx-auto" />
            <p className="text-2xl font-semibold">Интерактивная карта</p>
            <p className="text-muted-foreground">
              Здесь будет отображаться карта с локациями
            </p>
          </div>
        </div>

        {/* Маркеры локаций */}
        <div className="absolute inset-0">
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              className={`absolute w-8 h-8 rounded-full ${typeConfig[location.type].color} border-2 border-white shadow-lg hover:scale-110 transition-transform`}
              style={{
                left: `${20 + location.id * 15}%`,
                top: `${30 + location.id * 10}%`,
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <Icon
                name={typeConfig[location.type].icon as any}
                size={16}
                className="text-white mx-auto"
              />
            </button>
          ))}
        </div>

        {/* Детали выбранной локации */}
        {selectedLocation && (
          <Card className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 p-4">
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
