import React from 'react'
import Header from './Header'
import MessageList from './MessageList'
import InputBar from './InputBar'

export default function ChatLayout(){
  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white">
      <Header />

      {/* steps / chips */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <span className="w-4 h-4 flex items-center justify-center bg-green-600 text-white rounded-full">✓</span>
            确认账号信息
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <span className="w-4 h-4 flex items-center justify-center bg-green-600 text-white rounded-full">✓</span>
            买家上号验号
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <span className="w-4 h-4 flex items-center justify-center bg-green-600 text-white rounded-full">✓</span>
            双方换绑账号
          </div>
        </div>
      </div>

      <MessageList />

      <div className="px-3 py-2 bg-white border-t">
        <div className="flex gap-2 justify-between mb-2">
          <button className="flex-1 bg-white border rounded-md py-2 text-sm">催客服</button>
          <button className="flex-1 bg-white border rounded-md py-2 text-sm">评价</button>
          <button className="flex-1 bg-white border rounded-md py-2 text-sm">交易信息</button>
          <button className="flex-1 bg-white border rounded-md py-2 text-sm">投诉建议</button>
        </div>
        <InputBar />
      </div>
    </div>
  )
}
