
import React, { useState } from 'react';
import MessageList from './MessageList';
import ConversationView from './ConversationView';
import { User, Conversation } from '@/lib/types';

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleSelectConversation = (conversation: Conversation, otherUser: User) => {
    setSelectedConversation(conversation);
    setSelectedUser(otherUser);
  };
  
  const handleBack = () => {
    setSelectedConversation(null);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Message Center</h2>
        <p className="text-muted-foreground">Communicate with teachers, parents, and school staff</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        {/* On mobile, show either the list or the conversation */}
        <div className={`md:col-span-4 ${selectedConversation ? 'hidden md:block' : ''}`}>
          <MessageList onSelectConversation={handleSelectConversation} />
        </div>
        
        <div className={`md:col-span-8 ${!selectedConversation ? 'hidden md:block' : ''}`}>
          {selectedConversation && selectedUser ? (
            <ConversationView 
              conversation={selectedConversation} 
              otherUser={selectedUser}
              onBack={handleBack}
            />
          ) : (
            <div className="h-[calc(100vh-16rem)] flex items-center justify-center border rounded-md">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
