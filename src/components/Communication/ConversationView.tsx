
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Send, Paperclip, MoreHorizontal, User, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockMessages } from '@/lib/mockData';
import { useAuth } from '@/lib/authContext';
import { Message, Conversation, User as UserType } from '@/lib/types';

interface ConversationViewProps {
  conversation: Conversation;
  otherUser: UserType;
  onBack: () => void;
}

const ConversationView = ({ conversation, otherUser, onBack }: ConversationViewProps) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  if (!user) return null;
  
  // Get all messages for this conversation
  const conversationMessages = mockMessages.filter(msg => 
    conversation.participants.includes(msg.senderId) && 
    conversation.participants.includes(msg.recipientId)
  );
  
  // Sort by date (oldest first)
  const sortedMessages = [...conversationMessages].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Auto-scroll to the bottom of the message list
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sortedMessages]);
  
  const formatMessageDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
      ' • ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, we'd send this to the API
    // For the demo, we'll just log it
    console.log('Sending message:', {
      content: newMessage,
      from: user.id,
      to: otherUser.id
    });
    
    // Clear the input
    setNewMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col border rounded-md overflow-hidden">
      {/* Conversation Header */}
      <div className="p-4 border-b flex items-center justify-between bg-background/95 sticky top-0 z-10">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center">
            {otherUser.avatar ? (
              <img 
                src={otherUser.avatar} 
                alt={otherUser.name} 
                className="w-8 h-8 rounded-full mr-3"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div>
              <p className="font-medium">{otherUser.name}</p>
              <p className="text-xs text-muted-foreground">
                {otherUser.role.charAt(0).toUpperCase() + otherUser.role.slice(1)}
              </p>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((message, index) => {
          const isFromCurrentUser = message.senderId === user.id;
          
          return (
            <div 
              key={message.id} 
              className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${isFromCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'} rounded-lg px-4 py-2`}>
                {index === 0 || sortedMessages[index-1].senderId !== message.senderId ? (
                  <p className="text-xs opacity-70 mb-1">
                    {message.subject}
                  </p>
                ) : null}
                
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                <div className={`flex justify-end items-center mt-1 text-xs ${isFromCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {formatMessageDate(message.date)}
                </div>
              </div>
            </div>
          );
        })}
        
        <div ref={messageEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t bg-background/95">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Textarea 
            placeholder="Type your message..." 
            className="min-h-[2.5rem] max-h-[10rem]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <Button 
            className="flex-shrink-0" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
