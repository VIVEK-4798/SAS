import React from 'react'

const DeleteButton = ({label, onDelete}) => {
  return (
    <button
        type='button'>
        {label}
    </button>
  )
}

export default DeleteButton