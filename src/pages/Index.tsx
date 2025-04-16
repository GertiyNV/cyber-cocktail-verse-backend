
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DrinkSelection } from "@/components/DrinkSelection";
import { CocktailList } from "@/components/CocktailList";
import { RandomDrink } from "@/components/RandomDrink";
import { TopUsers } from "@/components/TopUsers";
import { FeedbackForm } from "@/components/FeedbackForm";
import { MoscowBars } from "@/components/MoscowBars";
import { FridayTimer } from "@/components/FridayTimer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [isPinkTheme, setIsPinkTheme] = useState(false);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);

  const toggleTheme = () => {
    setIsPinkTheme((prev) => !prev);
    // Apply theme class to body
    if (isPinkTheme) {
      document.body.classList.remove("pink-theme");
    } else {
      document.body.classList.add("pink-theme");
    }
  };

  const handleSelectDrinks = (drinks: string[]) => {
    setSelectedDrinks(drinks);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isPinkTheme ? "pink-theme" : ""}`}>
      <Navbar isPinkTheme={isPinkTheme} />
      <ThemeToggle isPinkTheme={isPinkTheme} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto">
        <section id="drinks">
          <DrinkSelection 
            isPinkTheme={isPinkTheme} 
            onSelectDrinks={handleSelectDrinks} 
          />
        </section>
        
        <section id="cocktails">
          <CocktailList 
            isPinkTheme={isPinkTheme} 
            selectedDrinks={selectedDrinks} 
          />
        </section>
        
        <section id="random">
          <RandomDrink 
            isPinkTheme={isPinkTheme} 
          />
        </section>
        
        <section id="top-users">
          <TopUsers 
            isPinkTheme={isPinkTheme} 
          />
        </section>
        
        <section id="comments">
          <FeedbackForm 
            isPinkTheme={isPinkTheme} 
          />
        </section>
        
        <section id="bars">
          <MoscowBars 
            isPinkTheme={isPinkTheme} 
          />
        </section>
      </main>
      
      <FridayTimer 
        isPinkTheme={isPinkTheme} 
      />
    </div>
  );
};

export default Index;
