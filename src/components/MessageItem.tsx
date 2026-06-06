import React from 'react'

type Msg = {
  id: string
  type: 'system'|'agent'|'card'|'notice'
  avatar?: string
  title?: string
  text?: string
}

export default function MessageItem({ message }: { message: Msg }){
  if(message.type === 'system'){
    return (
      <div className="text-center text-sm text-gray-500">{message.text}</div>
    )
  }

  if(message.type === 'notice'){
    return (
      <div className="bg-orange-50 border border-orange-200 p-3 rounded-md text-orange-800">
        <div className="font-medium mb-2">温馨小贴士</div>
        <div className="text-sm">1. 客服服务时间为：09:30-00:30，非服务时段请勿擅自操作流程</div>
      </div>
    )
  }

  if(message.type === 'card'){
    return (
      <div className="bg-white rounded-lg border p-3 shadow-sm">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="font-medium">【CRTTR5293】 金皮3…</div>
            <div className="text-sm text-gray-500">原价 ￥288</div>
            <div className="text-orange-500 font-semibold">预计到手 ￥235</div>
          </div>
        </div>
      </div>
    )
  }

  // agent message
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">🐙</div>
      <div className="bg-white p-3 rounded-lg border max-w-[80%]">
        <div className="text-sm text-gray-800">{message.text}</div>
        <div className="text-xs text-gray-400 mt-2">官方 05/07 13:32</div>
      </div>
    </div>
  )
}
