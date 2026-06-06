import React from 'react'

export default function Header(){
  return (
    <div className="flex items-center px-4 py-3 bg-white shadow-sm">
      <button className="mr-3 text-gray-600">◀</button>
      <div className="flex-1 text-center font-medium text-gray-800">CRTTR5293超自然行动组</div>
      <button className="ml-3 text-gray-600">⋮</button>
    </div>
  )
}
