
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeedbackFormProps {
  isPinkTheme: boolean;
}

export function FeedbackForm({ isPinkTheme }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send this data to a server
    console.log({ name, email, message });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-16 px-4" id="comments">
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8 text-center",
          isPinkTheme ? "neon-text-pink" : "neon-text"
        )}
      >
        Комментарии о сервисе
      </h2>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="cyberpunk-card p-6 rounded-lg">
          <h3 
            className={cn(
              "text-xl font-bold mb-4",
              isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
            )}
          >
            Оставьте отзыв
          </h3>
          
          {submitted ? (
            <div 
              className={cn(
                "p-4 rounded-lg text-center mb-4",
                isPinkTheme 
                  ? "bg-cyber-pink/20 text-cyber-pink-light" 
                  : "bg-cyber-neon/20 text-cyber-neon"
              )}
            >
              Спасибо за ваш отзыв!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-muted-foreground text-sm mb-2" htmlFor="name">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={cn(
                    "w-full p-3 rounded-lg bg-cyber-muted border focus:outline-none",
                    isPinkTheme 
                      ? "border-cyber-accent focus:border-cyber-pink" 
                      : "border-cyber-accent focus:border-cyber-neon"
                  )}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-muted-foreground text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full p-3 rounded-lg bg-cyber-muted border focus:outline-none",
                    isPinkTheme 
                      ? "border-cyber-accent focus:border-cyber-pink" 
                      : "border-cyber-accent focus:border-cyber-neon"
                  )}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-muted-foreground text-sm mb-2" htmlFor="message">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className={cn(
                    "w-full p-3 rounded-lg bg-cyber-muted border focus:outline-none",
                    isPinkTheme 
                      ? "border-cyber-accent focus:border-cyber-pink" 
                      : "border-cyber-accent focus:border-cyber-neon"
                  )}
                />
              </div>
              
              <button
                type="submit"
                className={cn(
                  "px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-full",
                  isPinkTheme 
                    ? "bg-cyber-pink text-white shadow-[0_0_15px_rgba(255,0,119,0.5)]" 
                    : "bg-cyber-neon text-cyber-dark shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                )}
              >
                Отправить
              </button>
            </form>
          )}
        </div>
        
        <div className="cyberpunk-card p-6 rounded-lg">
          <h3 
            className={cn(
              "text-xl font-bold mb-4",
              isPinkTheme ? "text-cyber-pink" : "text-cyber-neon"
            )}
          >
            Последние отзывы
          </h3>
          
          <div className="space-y-4">
            <div className="border-b border-cyber-accent/30 pb-4">
              <div className="flex items-center mb-2">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="КиберАлекс" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold">КиберАлекс</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Отличный сервис! Нашел новые коктейли, которые теперь готовлю дома. 
                Особенно понравился Неоновый Всплеск и Цифровой Дождь.
              </p>
            </div>
            
            <div className="border-b border-cyber-accent/30 pb-4">
              <div className="flex items-center mb-2">
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  alt="НеоМарина" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold">НеоМарина</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Интересный дизайн в стиле киберпанк! Удобно выбирать напитки и смотреть рецепты. 
                Хотелось бы больше информации о барах.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <img 
                  src="https://i.pravatar.cc/150?img=3" 
                  alt="ПанкМастер" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold">ПанкМастер</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Автомат "Пират" - огонь! Каждый раз выпадает что-то новое и интересное. 
                Хотелось бы еще больше рецептов с джином.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
