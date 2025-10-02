"use client";

import { useState } from "react";

interface SectionPhotosProps {
  photoResident: string | null;
  setPhotoResident: (url: string | null) => void;
}

export default function SectionPhotos({ photoResident, setPhotoResident }: SectionPhotosProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotoResident(url);
  };

  return (
    <div>
      {photoResident && <img src={photoResident} alt="Preview" className="w-full h-64 object-cover mb-2" />}
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
}
