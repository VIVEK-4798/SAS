import {React, useState} from 'react'

const DeleteButton = ({label, onDelete}) => {

  const [showConfirm, setShowConfirm] = useState(false);

  if(showConfirm){
    return(
      <div className='fixed bg-black/80 inset-0 flex items-center h-full justify-center'>
        <div className='bg-white  p-4 rounded-lg'>
        <div>Are you sure you want to delete?</div>
        <div className='flex gap-2 mt-3'>
          <button
            onClick={() => setShowConfirm(false)}
            type='button'>
              Cancel
          </button>
          <button
            onClick={() => {
              onDelete(); 
              setShowConfirm(false);
            }} 
            type='button'
            className='primary'>
              Yes,&nbsp;delete!
          </button>
        </div>
      </div>
      </div> 
    )
  }

  return (
    <button
        onClick={() => setShowConfirm(true)}
        type='button'
        className='border border-[#F9BC75]'>
        {label}
    </button>
  )
}

export default DeleteButton