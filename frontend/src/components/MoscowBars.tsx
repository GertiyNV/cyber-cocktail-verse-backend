
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import "./leaflet-styles.css";

interface MoscowBarsProps {
  isPinkTheme: boolean;
}

interface Bar {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
}

// Sample data for Moscow bars
const moscowBars: Bar[] = [
  { 
    id: 1, 
    name: "Киберкафе «Матрица»", 
    address: "ул. Арбат, 12", 
    latitude: 55.7522, 
    longitude: 37.6156, 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: "Бар «Неоновый Дождь»", 
    address: "Тверская ул., 15", 
    latitude: 55.7648, 
    longitude: 37.6004, 
    rating: 4.5 
  },
  { 
    id: 3, 
    name: "Коктейльный клуб «Дэканд»", 
    address: "Пятницкая ул., 29", 
    latitude: 55.7372, 
    longitude: 37.6297, 
    rating: 4.7 
  },
  { 
    id: 4, 
    name: "Техно-бар «Андроид»", 
    address: "Никольская ул., 10", 
    latitude: 55.7564, 
    longitude: 37.6266, 
    rating: 4.3 
  },
  { 
    id: 5, 
    name: "Рюмочная «Ретро Будущее»", 
    address: "Кузнецкий мост, 7", 
    latitude: 55.7614, 
    longitude: 37.6222, 
    rating: 4.6 
  },
];

export function MoscowBars({ isPinkTheme }: MoscowBarsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    // Only import leaflet on the client side
    if (typeof window !== "undefined" && mapRef.current && !leafletMap.current) {
      import("leaflet").then((L) => {
        // Initialize the map
        const map = L.map(mapRef.current!).setView([55.7558, 37.6173], 12);
        
        // Add tile layer (using OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap contributors"
        }).addTo(map);
        
        // Update container class based on theme
        if (isPinkTheme) {
          mapRef.current?.classList.add('pink-theme');
        } else {
          mapRef.current?.classList.remove('pink-theme');
        }
        
        // Add markers for bars
        moscowBars.forEach((bar) => {
          const markerIcon = L.divIcon({
            className: "custom-div-icon",
            html: `<div class="${isPinkTheme ? 'bg-cyber-pink' : 'bg-cyber-neon'} w-4 h-4 rounded-full"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          const marker = L.marker([bar.latitude, bar.longitude], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`
              <div>
                <h3 class="font-bold">${bar.name}</h3>
                <p>${bar.address}</p>
                <p>Рейтинг: ${bar.rating}</p>
              </div>
            `);
        });
        
        leafletMap.current = map;
      });
    }
    
    // Clean up on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [isPinkTheme]);
  
  return (
    <div className="py-16 px-4" id="bars">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Бары в Москве
      </h2>
      
      <div className="max-w-5xl mx-auto">
        <div className="cyberpunk-card p-6 rounded-lg">
          <div 
            className="h-96 rounded-lg overflow-hidden"
            ref={mapRef}
          ></div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moscowBars.map((bar) => (
              <div 
                key={bar.id}
                className={cn(
                  "p-4 rounded-lg",
                  isPinkTheme 
                    ? "bg-cyber-pink/5 hover:bg-cyber-pink/10" 
                    : "bg-cyber-neon/5 hover:bg-cyber-neon/10",
                  "transition-all duration-300 cursor-pointer"
                )}
              >
                <h3 
                  className={cn(
                    "font-bold mb-1",
                    isPinkTheme ? "text-cyber-pink-light" : "text-cyber-neon"
                  )}
                >
                  {bar.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {bar.address}
                </p>
                <div className="flex items-center">
                  <span 
                    className={cn(
                      "text-sm font-semibold",
                      isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
                    )}
                  >
                    Рейтинг: {bar.rating}
                  </span>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(bar.rating) 
                            ? isPinkTheme 
                              ? "text-cyber-pink" 
                              : "text-cyber-neon"
                            : "text-cyber-muted"
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
