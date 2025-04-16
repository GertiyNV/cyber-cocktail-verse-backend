
import { cn } from "@/lib/utils";

interface TopUsersProps {
  isPinkTheme: boolean;
}

// Sample top users data
const topUsers = [
  { id: 1, name: "КиберАлекс", comments: 42, avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "НеоМарина", comments: 36, avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "ПанкМастер", comments: 31, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "ТехноДрайв", comments: 28, avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 5, name: "ГлитчКвин", comments: 24, avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 6, name: "НайтСити", comments: 19, avatar: "https://i.pravatar.cc/150?img=6" },
];

export function TopUsers({ isPinkTheme }: TopUsersProps) {
  return (
    <div className="py-16 px-4" id="top-users">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Самые активные пользователи
      </h2>
      
      <div className="cyberpunk-card p-6 rounded-lg max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topUsers.map((user) => (
            <div
              key={user.id}
              className={cn(
                "flex items-center p-3 rounded-lg transition-all duration-300 hover:scale-102 group",
                isPinkTheme 
                  ? "hover:bg-cyber-pink/10"
                  : "hover:bg-cyber-neon/10"
              )}
            >
              <div className="relative mr-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div 
                  className={cn(
                    "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    isPinkTheme 
                      ? "bg-cyber-pink text-white" 
                      : "bg-cyber-neon text-cyber-dark"
                  )}
                >
                  {user.id}
                </div>
              </div>
              
              <div>
                <h3 
                  className={cn(
                    "font-semibold group-hover:font-bold transition-all",
                    isPinkTheme 
                      ? "group-hover:text-cyber-pink" 
                      : "group-hover:text-cyber-neon"
                  )}
                >
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Комментариев: {user.comments}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
