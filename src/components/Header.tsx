import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Лого */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon
                name="MapPin"
                size={20}
                className="text-primary-foreground"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">RoofMap</h1>
              <p className="text-xs text-muted-foreground">
                Карта для исследователей
              </p>
            </div>
          </div>

          {/* Поиск */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input placeholder="Поиск локаций..." className="pl-10" />
            </div>
          </div>

          {/* Навигация */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Map" size={16} className="mr-2" />
              Карта
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Heart" size={16} className="mr-2" />
              Избранное
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Users" size={16} className="mr-2" />
              Сообщество
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
