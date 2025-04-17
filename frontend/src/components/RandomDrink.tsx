
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface RandomDrinkProps {
  isPinkTheme: boolean;
}

// Sample data for random cocktails
const randomCocktails = [
  {
    name: "Неоновый Всплеск",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Кибер Панк",
    image: "https://images.unsplash.com/photo-1626589011551-8576b0046abb?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Протокол Призрака",
    image: "https://images.unsplash.com/photo-1638508399112-64f2ca586a3c?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Электрический Сон",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Перезагрузка Матрицы",
    image: "https://images.unsplash.com/photo-1629647587178-92c2b5e1a881?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Цифровой Дождь",
    image: "https://images.unsplash.com/photo-1620091090612-1586a9259334?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Ночной Город",
    image: "https://images.unsplash.com/photo-1626788764058-f4d67afa1a7e?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Хромированный Край",
    image: "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?q=80&w=300&auto=format&fit=crop",
  },
];

export function RandomDrink({ isPinkTheme }: RandomDrinkProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<typeof randomCocktails[0] | null>(null);
  const machineRef = useRef<HTMLDivElement>(null);

  const spinMachine = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedCocktail(null);
    
    // Simulate spinning animation
    const spins = 20; // Number of spins
    const spinDuration = 100; // Duration between spins (ms)
    let currentSpin = 0;
    
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomCocktails.length);
      setSelectedCocktail(randomCocktails[randomIndex]);
      
      currentSpin++;
      if (currentSpin >= spins) {
        clearInterval(spinInterval);
        
        // Final selection
        const finalIndex = Math.floor(Math.random() * randomCocktails.length);
        setSelectedCocktail(randomCocktails[finalIndex]);
        
        // Apply shaking effect to the machine
        if (machineRef.current) {
          machineRef.current.classList.add("animate-text-glitch");
          setTimeout(() => {
            if (machineRef.current) {
              machineRef.current.classList.remove("animate-text-glitch");
            }
            setIsSpinning(false);
          }, 300);
        } else {
          setIsSpinning(false);
        }
      }
    }, spinDuration);
  };

  return (
    <div className="py-16 px-4" id="random">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Случайный напиток
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <div 
          ref={machineRef}
          className={cn(
            "cyberpunk-card p-6 rounded-lg",
            isPinkTheme 
              ? "border-cyber-pink/30"
              : "border-cyber-neon/30"
          )}
        >
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-2">
              Нажмите на кнопку для случайного выбора коктейля
            </p>
            <h3 className="text-xl font-bold mb-4">Автомат "Пират"</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div 
              className={cn(
                "w-64 h-64 relative rounded-lg overflow-hidden mb-6 md:mb-0",
                isPinkTheme 
                  ? "border border-cyber-pink" 
                  : "border border-cyber-neon"
              )}
            >
              {selectedCocktail ? (
                <img 
                  src={selectedCocktail.image} 
                  alt={selectedCocktail.name} 
                  className={cn(
                    "w-full h-full object-cover transition-all",
                    isSpinning ? "opacity-70" : "opacity-100"
                  )}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-cyber-dark">
                  <span 
                    className={cn(
                      "text-6xl font-bold",
                      isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
                    )}
                  >
                    ?
                  </span>
                </div>
              )}
              
              <div 
                className={cn(
                  "absolute inset-0 pointer-events-none flex items-center justify-center",
                  selectedCocktail ? "opacity-0" : "opacity-100",
                  "transition-opacity duration-300"
                )}
              >
                <div 
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center",
                    isPinkTheme 
                      ? "bg-cyber-pink/20" 
                      : "bg-cyber-neon/20"
                  )}
                >
                  <span 
                    className={cn(
                      "text-3xl font-bold",
                      isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
                    )}
                  >
                    ?
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "mb-4 min-h-16 flex items-center justify-center",
                  isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
                )}
              >
                {selectedCocktail && (
                  <h3 className="text-2xl font-bold text-center">
                    {selectedCocktail.name}
                  </h3>
                )}
              </div>
              
              <button
                onClick={spinMachine}
                disabled={isSpinning}
                className={cn(
                  "px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105",
                  isSpinning ? "opacity-70 cursor-not-allowed" : "opacity-100",
                  isPinkTheme 
                    ? "bg-cyber-pink text-white shadow-[0_0_15px_rgba(255,0,119,0.5)]" 
                    : "bg-cyber-neon text-cyber-dark shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                )}
              >
                {isSpinning ? "Выбираем..." : "Случайный напиток"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
