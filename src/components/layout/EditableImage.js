import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

export default function EditableImage({ link, setLink }) {
  const [uploading, setUploading] = useState(false);

  // Normalize link: make sure it's always an array
  const imageLinks = Array.isArray(link) ? link : (link ? [link] : []);

  async function handleFileChange(ev) {
    const files = Array.from(ev.target.files);
    if (!files.length) return;

    const uploadedLinks = [];

    for (const file of files) {
      const data = new FormData();
      data.append("files", file);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Upload failed");
          return res.json();
        })
        .then((result) => {
          if (Array.isArray(result.link)) {
            uploadedLinks.push(...result.link);
          } else {
            uploadedLinks.push(result.link);
          }
        });

      await toast.promise(uploadPromise, {
        loading: `Uploading ${file.name}...`,
        success: "Upload Complete",
        error: "Upload failed",
      });
    }

    setLink((prev) => [...(Array.isArray(prev) ? prev : (prev ? [prev] : [])), ...uploadedLinks]);
  }

  return (
    <>
      {imageLinks.length > 0 ? (
        <div className="flex gap-2 flex-wrap justify-center mb-2">
          {imageLinks.map((img, idx) => (
            <Image
              key={idx}
              className="rounded-lg object-cover max-h-[150px]"
              src={img}
              alt={`uploaded-${idx}`}
              width={150}
              height={150}
            />
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <span className="block text-center border border-gray-300 rounded-lg p-2 cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
