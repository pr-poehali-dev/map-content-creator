import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface Location {
  id: number;
  name: string;
  type: "roof" | "bunker" | "abandoned" | "underground";
  description: string;
  rating: number;
  reviews: number;
  photos: string[];
  author: string;
  difficulty: "easy" | "medium" | "hard";
  isPrivate: boolean;
  coordinates: string;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: "Крыша БЦ Высоцкий",
    type: "roof",
    description:
      "Отличный вид на центр города. Легкий доступ через пожарную лестницу.",
    rating: 4.8,
    reviews: 24,
    photos: ["roof1.jpg", "roof2.jpg"],
    author: "UrbanExplorer",
    difficulty: "easy",
    isPrivate: false,
    coordinates: "56.8431, 60.6454",
  },
  {
    id: 2,
    name: "Заброшенный завод Уралмаш",
    type: "abandoned",
    description:
      "Огромная территория с множеством интересных зданий. Осторожно с охраной!",
    rating: 4.2,
    reviews: 18,
    photos: ["abandoned1.jpg"],
    author: "Stalker_66",
    difficulty: "hard",
    isPrivate: true,
    coordinates: "56.8506, 60.6127",
  },
  {
    id: 3,
    name: "Секретный бункер времен СССР",
    type: "bunker",
    description: "Хорошо сохранившийся объект. Нужен фонарик и теплая одежда.",
    rating: 4.9,
    reviews: 31,
    photos: ["bunker1.jpg", "bunker2.jpg", "bunker3.jpg"],
    author: "HistoryHunter",
    difficulty: "medium",
    isPrivate: true,
    coordinates: "56.8311, 60.6411",
  },
];

const typeConfig = {
  roof: { color: "bg-orange-500", icon: "Building", label: "Крыша" },
  bunker: { color: "bg-gray-600", icon: "Shield", label: "Бункер" },
  abandoned: { color: "bg-yellow-600", icon: "Home", label: "Заброшка" },
  underground: { color: "bg-blue-600", icon: "Zap", label: "Подземелье" },
};

const difficultyConfig = {
  easy: { color: "bg-green-500", label: "Легко" },
  medium: { color: "bg-yellow-500", label: "Средне" },
  hard: { color: "bg-red-500", label: "Сложно" },
};

export default function LocationCatalog() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredLocations =
    selectedType === "all"
      ? mockLocations
      : mockLocations.filter((loc) => loc.type === selectedType);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Каталог локаций</h1>
        <p className="text-muted-foreground mb-6">
          Исследуй городские секреты вместе с сообществом
        </p>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
          >
            Все места
          </Button>
          {Object.entries(typeConfig).map(([type, config]) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
            >
              <Icon name={config.icon as any} size={16} className="mr-2" />
              {config.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Сетка локаций */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              {/* Заглушка для фото */}
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative">
                <Icon name="Camera" size={32} className="text-gray-500" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className={typeConfig[location.type].color}>
                    <Icon
                      name={typeConfig[location.type].icon as any}
                      size={12}
                      className="mr-1"
                    />
                    {typeConfig[location.type].label}
                  </Badge>
                  {location.isPrivate && (
                    <Badge variant="secondary">
                      <Icon name="Lock" size={12} className="mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge
                    className={difficultyConfig[location.difficulty].color}
                  >
                    {difficultyConfig[location.difficulty].label}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {location.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {location.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-yellow-500" />
                    <span>{location.rating}</span>
                    <span className="text-muted-foreground">
                      ({location.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Camera" size={14} />
                    <span>{location.photos.length} фото</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {location.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {location.author}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Heart" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share" size={14} />
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  <Icon name="MapPin" size={14} className="mr-2" />
                  Показать на карте
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Кнопка добавления */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg">
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить место
        </Button>
      </div>
    </div>
  );
}
