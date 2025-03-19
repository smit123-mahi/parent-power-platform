
import React, { useState } from 'react';
import { MessageList } from '@/components/Communication/MessageList';
import ConversationView from '@/components/Communication/ConversationView';
import { Conversation, User } from '@/lib/types';

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleSelectConversation = (conversation: Conversation, otherUser: User) => {
    setSelectedConversation(conversation);
    setSelectedUser(otherUser);
  };
  
  const handleBackToList = () => {
    setSelectedConversation(null);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communicate with teachers, parents, and staff</p>
      </div>
      
      <div className="md:hidden">
        {selectedConversation && selectedUser ? (
          <ConversationView 
            conversation={selectedConversation} 
            otherUser={selectedUser} 
            onBack={handleBackToList}
          />
        ) : (
          <MessageList onSelectConversation={handleSelectConversation} />
        )}
      </div>
      
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <MessageList onSelectConversation={handleSelectConversation} />
        </div>
        
        <div className="md:col-span-1 lg:col-span-2">
          {selectedConversation && selectedUser ? (
            <ConversationView 
              conversation={selectedConversation} 
              otherUser={selectedUser} 
              onBack={handleBackToList}
            />
          ) : (
            <div className="h-[calc(100vh-16rem)] flex items-center justify-center border rounded-md bg-secondary/10">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
