
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FridayTimerProps {
  isPinkTheme: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function FridayTimer({ isPinkTheme }: FridayTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 5 is Friday
      
      // Calculate days until Friday
      let daysUntilFriday = 5 - currentDay;
      if (daysUntilFriday <= 0) daysUntilFriday += 7; // If it's Friday or after, get next Friday
      
      // Create date object for this Friday at 18:00
      const fridayAt18 = new Date(now);
      fridayAt18.setDate(now.getDate() + daysUntilFriday);
      fridayAt18.setHours(18, 0, 0, 0);
      
      // If it's Friday and after 18:00, set to next Friday
      if (currentDay === 5 && now.getHours() >= 18) {
        fridayAt18.setDate(fridayAt18.getDate() + 7);
      }
      
      // Calculate difference
      const difference = fridayAt18.getTime() - now.getTime();
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };
    
    // Update time initially
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-40 flex justify-center">
      <div 
        className={cn(
          "cyberpunk-card py-2 px-4 rounded-full flex items-center space-x-2",
          isPinkTheme 
            ? "border-cyber-pink/30" 
            : "border-cyber-neon/30"
        )}
      >
        <span className="text-muted-foreground text-sm mr-2">До пятницы 18:00:</span>
        
        <div 
          className={cn(
            "px-2 py-1 rounded-md",
            isPinkTheme ? "bg-cyber-pink/20" : "bg-cyber-neon/20"
          )}
        >
          <span className={isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"}>
            {timeLeft.days}д
          </span>
        </div>
        <div 
          className={cn(
            "px-2 py-1 rounded-md",
            isPinkTheme ? "bg-cyber-pink/20" : "bg-cyber-neon/20"
          )}
        >
          <span className={isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"}>
            {timeLeft.hours.toString().padStart(2, '0')}ч
          </span>
        </div>
        <div 
          className={cn(
            "px-2 py-1 rounded-md",
            isPinkTheme ? "bg-cyber-pink/20" : "bg-cyber-neon/20"
          )}
        >
          <span className={isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"}>
            {timeLeft.minutes.toString().padStart(2, '0')}м
          </span>
        </div>
        <div 
          className={cn(
            "px-2 py-1 rounded-md",
            isPinkTheme ? "bg-cyber-pink/20" : "bg-cyber-neon/20"
          )}
        >
          <span className={isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"}>
            {timeLeft.seconds.toString().padStart(2, '0')}с
          </span>
        </div>
      </div>
    </div>
  );
}
