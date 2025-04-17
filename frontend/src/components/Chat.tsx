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

const Chat = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVovanMode, setIsVovanMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Функция для прокрутки чата вниз
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Прокручиваем чат вниз при добавлении новых сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await api.post('/api/chat', {
        message: userMessage,
        isVovanMode
      });

      // Добавляем ответ GigaChat
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
    <Card className="w-full mb-8">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Чат с барменом</h2>
          <Button
            variant={isVovanMode ? "destructive" : "secondary"}
            onClick={() => setIsVovanMode(!isVovanMode)}
          >
            {isVovanMode ? 'Вован' : 'Обычный режим'}
          </Button>
        </div>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted'
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="p-4 bg-muted rounded-lg max-w-[80%]">
              {isVovanMode ? 'Вован печатает...' : 'Бармен печатает...'}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t">
        <div 
          className="flex gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isVovanMode ? "Напиши Вовану..." : "Спроси у бармена..."}
            disabled={isLoading}
          />
          <Button 
            type="button"
            onClick={sendMessage}
            disabled={isLoading}
          >
            Отправить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Chat; 
