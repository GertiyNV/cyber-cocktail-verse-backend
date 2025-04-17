import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVovanMode, setIsVovanMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  // Функция для прокрутки чата вниз
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Прокручиваем чат вниз при добавлении новых сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askForName = () => {
    if (!userName) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Привет! Как тебя зовут?' 
      }]);
    }
  };

  useEffect(() => {
    askForName();
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setIsNameSet(true);
      setMessages(prev => [...prev, 
        { role: 'user', content: userName },
        { role: 'assistant', content: isVovanMode 
          ? `Ну здарова, ${userName}! Че припёрся, как же ты заебал...` 
          : `Приятно познакомиться, ${userName}! Чем могу помочь?` 
        }
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await api.post('/api/chat', {
        message: userMessage,
        isVovanMode,
        sessionId: sessionId.current,
        userName
      });

      if (response.data.choices && response.data.choices[0]?.message?.content) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.data.choices[0].message.content 
        }]);
      } else {
        throw new Error('Неверный формат ответа от сервера');
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Произошла ошибка при обработке запроса. Попробуйте позже.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[350px] h-[500px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Чат с барменом</h2>
            <div className="flex gap-2">
              <Button
                variant={isVovanMode ? "destructive" : "secondary"}
                size="sm"
                onClick={() => setIsVovanMode(!isVovanMode)}
              >
                {isVovanMode ? 'Вован' : 'Обычный'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  } max-w-[80%]`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="p-3 bg-muted rounded-lg max-w-[80%] text-sm">
                  {isVovanMode ? 'Вован печатает...' : 'Бармен печатает...'}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              {!isNameSet ? (
                <>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                    placeholder="Введите ваше имя..."
                    className="text-sm"
                  />
                  <Button 
                    type="button"
                    onClick={handleNameSubmit}
                    size="sm"
                  >
                    OK
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isVovanMode ? "Напиши Вовану..." : "Спроси у бармена..."}
                    disabled={isLoading}
                    className="text-sm"
                  />
                  <Button 
                    type="button"
                    onClick={sendMessage}
                    disabled={isLoading}
                    size="sm"
                  >
                    Отправить
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 p-0"
        >
          💬
        </Button>
      )}
    </div>
  );
};

export default FloatingChat; 
