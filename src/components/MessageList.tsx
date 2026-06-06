import React from 'react'
import { messages } from '../data/mockMessages'
import MessageItem from './MessageItem'

export default function MessageList(){
  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))}
      </div>
    </div>
  )
}
