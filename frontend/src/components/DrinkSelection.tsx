
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DrinkSelectionProps {
  isPinkTheme: boolean;
  onSelectDrinks: (drinks: string[]) => void;
}

const drinkOptions = [
  { id: "vodka", name: "Водка", image: "https://images.unsplash.com/photo-1514218953589-2d7d87350d10?q=80&w=200&auto=format&fit=crop" },
  { id: "rum", name: "Ром", image: "https://images.unsplash.com/photo-1585975754487-68a0d11a427d?q=80&w=200&auto=format&fit=crop" },
  { id: "gin", name: "Джин", image: "https://images.unsplash.com/photo-1608885898957-a06352670f58?q=80&w=200&auto=format&fit=crop" },
  { id: "tequila", name: "Текила", image: "https://images.unsplash.com/photo-1592751449158-286b2e476464?q=80&w=200&auto=format&fit=crop" },
  { id: "whiskey", name: "Виски", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=200&auto=format&fit=crop" },
  { id: "liqueur", name: "Ликер", image: "https://images.unsplash.com/photo-1601652589234-c759ec91d5af?q=80&w=200&auto=format&fit=crop" },
  { id: "brandy", name: "Бренди", image: "https://images.unsplash.com/photo-1557383233-ba4f8f8a4f9d?q=80&w=200&auto=format&fit=crop" },
  { id: "vermouth", name: "Вермут", image: "https://images.unsplash.com/photo-1674028203162-c20e67d13ac5?q=80&w=200&auto=format&fit=crop" },
];

export function DrinkSelection({ isPinkTheme, onSelectDrinks }: DrinkSelectionProps) {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);

  const toggleDrink = (drinkId: string) => {
    setSelectedDrinks((prev) => {
      const newSelection = prev.includes(drinkId)
        ? prev.filter((id) => id !== drinkId)
        : [...prev, drinkId];
      
      onSelectDrinks(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="pt-24 md:pt-32 px-4">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Выбор напитков
      </h2>
      
      <div className="cyberpunk-card p-6 rounded-lg max-w-4xl mx-auto">
        <p className="text-center mb-6 text-muted-foreground">
          Выберите ваши любимые напитки, чтобы получить подходящие коктейли
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {drinkOptions.map((drink) => (
            <div 
              key={drink.id} 
              onClick={() => toggleDrink(drink.id)}
              className={cn(
                "cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1",
                selectedDrinks.includes(drink.id) 
                  ? isPinkTheme 
                    ? "neon-border-pink animate-pulse-pink" 
                    : "neon-border animate-pulse-neon"
                  : "border border-cyber-accent/30"
              )}
            >
              <div className="relative h-32 overflow-hidden rounded-t-lg">
                <img 
                  src={drink.image} 
                  alt={drink.name} 
                  className="w-full h-full object-cover"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t",
                  isPinkTheme 
                    ? "from-cyber-pink/30 to-transparent" 
                    : "from-cyber-neon/30 to-transparent"
                )} />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold">{drink.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
