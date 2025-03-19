import React, { useState } from 'react';
import { Search, MessageSquare, ChevronRight, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockUsers, mockConversations, mockMessages } from '@/lib/mockData';
import { useAuth } from '@/lib/authContext';
import { Message, Conversation, User as UserType } from '@/lib/types';

interface MessageListProps {
  onSelectConversation: (conversation: Conversation, otherUser: UserType) => void;
}

export const MessageList = ({ onSelectConversation }: MessageListProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!user) return null;
  
  // Filter conversations where the current user is a participant
  const userConversations = mockConversations.filter(conv => 
    conv.participants.includes(user.id)
  );
  
  // Filter by search query
  const filteredConversations = userConversations.filter(conv => {
    if (!searchQuery) return true;
    
    // Find the other participant
    const otherParticipantId = conv.participants.find(id => id !== user.id);
    const otherUser = mockUsers.find(u => u.id === otherParticipantId);
    
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Sort conversations by last message date (most recent first)
  const sortedConversations = [...filteredConversations].sort((a, b) => 
    new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
  );
  
  const getLastMessage = (conversation: Conversation): Message | undefined => {
    // Get all messages for this conversation
    const conversationMessages = mockMessages.filter(msg => 
      conversation.participants.includes(msg.senderId) && 
      conversation.participants.includes(msg.recipientId)
    );
    
    // Sort by date and get the most recent
    return conversationMessages.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  };
  
  const getOtherUser = (conversation: Conversation): UserType | undefined => {
    const otherParticipantId = conversation.participants.find(id => id !== user.id);
    return mockUsers.find(u => u.id === otherParticipantId);
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col border rounded-md">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search messages..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.length > 0 ? (
          sortedConversations.map(conversation => {
            const lastMessage = getLastMessage(conversation);
            const otherUser = getOtherUser(conversation);
            
            if (!lastMessage || !otherUser) return null;
            
            const isUnread = conversation.unreadCount > 0;
            
            return (
              <button
                key={conversation.id}
                className={`w-full text-left px-4 py-3 hover:bg-secondary/50 flex items-start space-x-3 border-b transition-colors ${isUnread ? 'bg-primary/5' : ''}`}
                onClick={() => onSelectConversation(conversation, otherUser)}
              >
                <div className="flex-shrink-0 mt-1">
                  {otherUser.avatar ? (
                    <img 
                      src={otherUser.avatar} 
                      alt={otherUser.name} 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className={`font-medium truncate ${isUnread ? 'text-primary' : ''}`}>
                      {otherUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center whitespace-nowrap ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(lastMessage.date)}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage.subject}
                  </p>
                  
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                      {lastMessage.content}
                    </p>
                    
                    {isUnread && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground opacity-30 mb-4" />
            <p className="text-lg font-medium">No messages found</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? `No conversations match '${searchQuery}'` 
                : 'Start a new conversation by clicking "New Message"'}
            </p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
    </div>
  );
};
