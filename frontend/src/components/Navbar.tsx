
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  isPinkTheme: boolean;
}

const navItems: NavItem[] = [
  { id: "drinks", label: "Выбор напитков" },
  { id: "cocktails", label: "Список коктейлей" },
  { id: "random", label: "Случайный напиток" },
  { id: "top-users", label: "Самые активные пользователи" },
  { id: "comments", label: "Комментарии о сервисе" },
  { id: "bars", label: "Бары в Москве" },
];

export function Navbar({ isPinkTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("drinks");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        scrolled ? "py-2 bg-cyber-dark/80 backdrop-blur-lg" : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className={cn(
            "text-2xl font-bold cursor-pointer",
            isPinkTheme ? "neon-text-pink" : "neon-text"
          )}
          onClick={() => scrollToSection("drinks")}
        >
          <span className="glitch-effect" data-text="КИБЕРКОКТЕЙЛЬ">КИБЕРКОКТЕЙЛЬ</span>
        </div>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-2 rounded-md text-sm transition-all duration-200",
                activeSection === item.id 
                  ? isPinkTheme
                    ? "bg-cyber-pink-dark/30 text-white neon-text-pink"
                    : "bg-cyber-neon/30 text-white neon-text"
                  : "hover:bg-cyber-dark"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={() => {
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
              }
            }}
            className={cn(
              "p-2 rounded",
              isPinkTheme ? "neon-text-pink" : "neon-text"
            )}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div id="mobile-menu" className="hidden absolute top-full left-0 right-0 mt-2 p-4 bg-cyber-dark/95 backdrop-blur-lg border-t border-b border-cyber-accent/30">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                      mobileMenu.classList.add('hidden');
                    }
                  }}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm transition-all duration-200 text-left",
                    activeSection === item.id 
                      ? isPinkTheme
                        ? "bg-cyber-pink-dark/30 text-white neon-text-pink"
                        : "bg-cyber-neon/30 text-white neon-text"
                      : "hover:bg-cyber-dark"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
