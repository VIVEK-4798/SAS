import React from 'react'

const SuccessBox = ({fadeOut}) => {
  return (
    <h2 className={`text-center bg-green-200 p-3 rounded-lg border border-green-400 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        Profile Saved!
    </h2>
  )
}

export default SuccessBox