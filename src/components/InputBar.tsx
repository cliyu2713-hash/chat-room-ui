import React, { useState } from 'react'

export default function InputBar(){
  const [value, setValue] = useState('')
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 text-gray-600">😊</button>
      <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="请输入想咨询的问题..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={()=>{setValue('')}}>发送</button>
    </div>
  )
}
