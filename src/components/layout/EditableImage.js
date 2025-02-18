import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast"; // 🔹 Import toast

export default function EditableImage({ link, setLink }) { // 🔹 Correct props handling

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.append("files", files[0]);

      // 🔹 Return promise inside toast
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then(response => {
          if (!response.ok) throw new Error("Upload failed");
          return response.json();
        })
        .then(result => {
          setLink(result.link); // 🔹 Corrected link extraction
        });

        toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload Complete",
        error: "Upload failed",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1 max-h-[80px]"
          src={link}
          alt="avatar"
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
            No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block text-center border border-gray-300 rounded-lg p-2 cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
