
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Cocktail {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
}

interface CocktailListProps {
  isPinkTheme: boolean;
  selectedDrinks: string[];
}

// Sample cocktail data
const cocktailsData: Cocktail[] = [
  {
    id: "neon-burst",
    name: "Неоновый Всплеск",
    description: "Яркий и энергичный коктейль с мощным вкусом и светящимся эффектом.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=300&auto=format&fit=crop",
    ingredients: ["vodka", "liqueur", "vermouth"]
  },
  {
    id: "cyber-punk",
    name: "Кибер Панк",
    description: "Темный и интенсивный коктейль с дымящимся эффектом и резким вкусом.",
    image: "https://images.unsplash.com/photo-1626589011551-8576b0046abb?q=80&w=300&auto=format&fit=crop",
    ingredients: ["whiskey", "rum", "vermouth"]
  },
  {
    id: "ghost-protocol",
    name: "Протокол Призрака",
    description: "Прозрачный коктейль с неожиданно сильным вкусом и легким послевкусием.",
    image: "https://images.unsplash.com/photo-1638508399112-64f2ca586a3c?q=80&w=300&auto=format&fit=crop",
    ingredients: ["gin", "vodka", "liqueur"]
  },
  {
    id: "electric-dream",
    name: "Электрический Сон",
    description: "Сладкий коктейль с нотками цитрусов и легким жжением на языке.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=300&auto=format&fit=crop",
    ingredients: ["tequila", "liqueur", "rum"]
  },
  {
    id: "matrix-reload",
    name: "Перезагрузка Матрицы",
    description: "Многослойный коктейль с комплексным вкусом и длительным послевкусием.",
    image: "https://images.unsplash.com/photo-1629647587178-92c2b5e1a881?q=80&w=300&auto=format&fit=crop",
    ingredients: ["whiskey", "brandy", "vermouth"]
  },
  {
    id: "digital-rain",
    name: "Цифровой Дождь",
    description: "Освежающий коктейль с мятой и экзотическими фруктами.",
    image: "https://images.unsplash.com/photo-1620091090612-1586a9259334?q=80&w=300&auto=format&fit=crop",
    ingredients: ["gin", "vodka", "vermouth"]
  },
  {
    id: "night-city",
    name: "Ночной Город",
    description: "Крепкий и мрачный коктейль с кофейными нотками и горьким послевкусием.",
    image: "https://images.unsplash.com/photo-1626788764058-f4d67afa1a7e?q=80&w=300&auto=format&fit=crop",
    ingredients: ["rum", "brandy", "whiskey"]
  },
  {
    id: "chrome-edge",
    name: "Хромированный Край",
    description: "Металлический вкус с острыми нотками специй и гладким финишем.",
    image: "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?q=80&w=300&auto=format&fit=crop",
    ingredients: ["tequila", "gin", "liqueur"]
  },
];

export function CocktailList({ isPinkTheme, selectedDrinks }: CocktailListProps) {
  const [displayedCocktails, setDisplayedCocktails] = useState<Cocktail[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    // Filter cocktails based on selected drinks
    if (selectedDrinks.length === 0) {
      setDisplayedCocktails(cocktailsData);
    } else {
      const filtered = cocktailsData.filter((cocktail) =>
        cocktail.ingredients.some((ingredient) => selectedDrinks.includes(ingredient))
      );
      setDisplayedCocktails(filtered);
    }
  }, [selectedDrinks]);

  return (
    <div className="py-16 px-4" id="cocktails">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Список коктейлей
      </h2>
      
      {displayedCocktails.length === 0 ? (
        <div className="cyberpunk-card p-6 rounded-lg max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Выберите напитки, чтобы увидеть подходящие коктейли
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayedCocktails.map((cocktail) => (
            <div 
              key={cocktail.id}
              className={cn(
                "cyberpunk-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105",
                selectedCocktail?.id === cocktail.id 
                  ? isPinkTheme 
                    ? "neon-border-pink" 
                    : "neon-border"
                  : ""
              )}
              onClick={() => setSelectedCocktail(
                selectedCocktail?.id === cocktail.id ? null : cocktail
              )}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={cocktail.image} 
                  alt={cocktail.name} 
                  className="w-full h-full object-cover"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-70"
                )} />
                <h3 
                  className={cn(
                    "absolute bottom-0 left-0 right-0 p-3 text-xl font-bold",
                    isPinkTheme ? "text-cyber-pink-light" : "text-cyber-neon"
                  )}
                >
                  {cocktail.name}
                </h3>
              </div>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                selectedCocktail?.id === cocktail.id 
                  ? "max-h-80" 
                  : "max-h-16"
              )}>
                <div className="p-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    {cocktail.description}
                  </p>
                  
                  {selectedCocktail?.id === cocktail.id && (
                    <div>
                      <h4 className="font-semibold mb-2">Ингредиенты:</h4>
                      <ul className="text-sm space-y-1">
                        {cocktail.ingredients.map((ingredient) => (
                          <li 
                            key={ingredient}
                            className={cn(
                              "inline-block mr-2 mb-2 px-2 py-1 rounded-full text-xs",
                              selectedDrinks.includes(ingredient)
                                ? isPinkTheme
                                  ? "bg-cyber-pink/20 text-cyber-pink-light"
                                  : "bg-cyber-neon/20 text-cyber-neon"
                                : "bg-cyber-muted/20"
                            )}
                          >
                            {ingredient === "vodka" && "Водка"}
                            {ingredient === "rum" && "Ром"}
                            {ingredient === "gin" && "Джин"}
                            {ingredient === "tequila" && "Текила"}
                            {ingredient === "whiskey" && "Виски"}
                            {ingredient === "liqueur" && "Ликер"}
                            {ingredient === "brandy" && "Бренди"}
                            {ingredient === "vermouth" && "Вермут"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
