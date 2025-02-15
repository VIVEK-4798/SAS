import React from 'react'

const SuccessBox = ({children}) => {
  return (
    <div className="text-center bg-green-200 p-3 rounded-lg border border-green-400">
        {children}
    </div>
  )
}

export default SuccessBox