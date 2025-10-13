// "use client";

// import { useState } from "react";

// interface SectionPhotosProps {
//   photoResident: string | null;
//   setPhotoResident: (base64: string | null) => void;
// }

// export default function SectionPhotos({
//   photoResident,
//   setPhotoResident,
// }: SectionPhotosProps) {
//   const [loading, setLoading] = useState(false);

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const file = e.target.files[0];
//     const reader = new FileReader();

//     setLoading(true);

//     reader.onloadend = () => {
//       const base64String = reader.result as string;

//       // Remove prefixo "data:image/xxx;base64,"
//       const commaIndex = base64String.indexOf(",");
//       const pureBase64 =
//         commaIndex >= 0 ? base64String.substring(commaIndex + 1) : base64String;

//       // Usa o Base64 puro para envio
//       setPhotoResident(pureBase64);

//       setLoading(false);
//     };

//     reader.onerror = () => {
//       console.error("Erro ao ler o arquivo");
//       setLoading(false);
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       {photoResident && (
//         <img
//           src={`data:image/jpeg;base64,${photoResident}`} // só para preview adiciona o prefixo
//           alt="Preview"
//           className="w-full h-64 object-cover mb-2 rounded-md border"
//         />
//       )}

//       {loading && (
//         <div className="text-sm text-gray-500 mb-2">Carregando imagem...</div>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleUpload}
//         className="border p-1 rounded"
//       />
//     </div>
//   );
// }
