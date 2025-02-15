import React from 'react'

const InfoBox = ({children}) => {
  return (
    <div className="text-center bg-blue-200 p-3 rounded-lg border border-blue-400">
        {children}
    </div>
  )
}

export default InfoBox