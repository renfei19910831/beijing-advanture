import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, Minimize2 } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'panda';
  timestamp: Date;
}

const PandaChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是小熊猫助手 🐼 有什么可以帮助您的吗？',
      sender: 'panda',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 自动回复模拟
  const pandaReplies = [
    '很高兴为您服务！🐼',
    '这是一个很好的问题呢～',
    '让我想想怎么帮助您... 🤔',
    '您可以浏览我们的摄影师作品哦！📸',
    '需要预约摄影服务吗？我来帮您！',
    '有什么其他问题吗？我很乐意帮助您～',
    '您的想法很棒！✨'
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // 模拟熊猫回复
    setTimeout(() => {
      const randomReply = pandaReplies[Math.floor(Math.random() * pandaReplies.length)];
      const pandaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sender: 'panda',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, pandaMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 3秒后显示熊猫按钮
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* 悬浮熊猫按钮 */}
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-50 shadow-elegant hover:shadow-hover border-2 border-gray-200 transition-all duration-300 p-0 group overflow-hidden"
          >
            {/* 熊猫图像 */}
            <img 
              src={pandaMascot} 
              alt="熊猫助手" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            
            {/* 消息提示点 */}
            {!isOpen && messages.length > 1 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                !
              </div>
            )}
          </Button>
        </div>
      )}

      {/* IM对话窗口 */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-40 animate-fade-in">
          <Card className={`w-80 shadow-elegant border-border/20 transition-all duration-300 ${
            isMinimized ? 'h-12' : 'h-96'
          }`}>
            <CardHeader className="p-3 bg-gradient-primary text-white rounded-t-lg flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* 迷你熊猫头像 */}
                <div className="w-6 h-6 bg-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute -top-0.5 left-0 w-1.5 h-1.5 bg-black rounded-full"></div>
                  <div className="absolute -top-0.5 right-0 w-1.5 h-1.5 bg-black rounded-full"></div>
                </div>
                <h3 className="text-sm font-semibold">小熊猫助手</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-80">
                {/* 消息区域 */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-3">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-primary text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* 输入区域 */}
                <div className="p-3 border-t border-border/20">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="输入消息..."
                      className="flex-1 border-border/50 focus:border-primary"
                    />
                    <Button 
                      size="sm" 
                      onClick={sendMessage}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default PandaChatBot;