'use client';
import React, { useState } from 'react';

const DeleteButton = ({ label, icon, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-3 justify-end">
            <button onClick={() => setShowConfirm(false)} type="button">
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary"
            >
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      type="button"
      className="flex items-center gap-2 px-3 py-1 border border-[#F9BC75] rounded-xl hover:bg-red-100 transition"
    >
      {icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default DeleteButton;
