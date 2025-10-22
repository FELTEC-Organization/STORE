"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  // WebcamIcon,
  // Upload,
  Camera,
  // ImageUp,
  Save,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

// Tipos das props
type SectionPhotosProps = {
  photo: string | null;
  setPhoto: (photo: string | null) => void;
};

// Componente genérico de conteúdo da foto
function PhotoContent({
  initialImage,
  onSave,
}: {
  initialImage: string | null;
  onSave: (image: string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(
    initialImage
  );
  const [openWebcam, setOpenWebcam] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCapturedImage(base64String);
      onSave(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      {openWebcam ? (
        capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="Captura"
              className="rounded-md border"
              width={384}
              height={288}
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => setCapturedImage(null)}>Refazer</Button>
              <Button
                variant="sunset"
                onClick={() => {
                  if (capturedImage) {
                    onSave(capturedImage);
                    setOpenWebcam(false);
                  }
                }}
              >
                Confirmar
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center relative">
            <Button
              className="absolute -top-1 -right-1 mx-2 z-10 !p-0 rounded-full border-none !bg-transparent"
              onClick={() => setOpenWebcam(false)}
            >
              <X className="!w-5 !h-5" />
            </Button>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="rounded-md border"
              width={384}
              height={288}
            />
            <Button className="mt-2" variant="adventure" onClick={capture}>
              <Camera /> Capturar
            </Button>
          </div>
        )
      ) : capturedImage ? (
        <div className="relative inline-block">
          <img
            src={capturedImage}
            alt="Foto"
            className="rounded-full border object-cover w-40 h-40"
          />
        </div>
      ) : (
        <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-3xl">
          <User size={50}/>
        </div>
      )}

      {!openWebcam && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="adventure"
            onClick={() => fileInputRef.current?.click()}
          >
            Alterar foto
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default function SectionPhotos({
  photo,
  setPhoto,
}: SectionPhotosProps) {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(photo);

  const handleSave = (image: string) => {
    const displayImage = image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
    setPhoto(displayImage);
    setOpen(false);
  };

  return (
    <>
      {/* Avatar + botão de alterar */}
      <PhotoContent initialImage={photo} onSave={setPhoto} />

      {/* Modal caso queira adicionar webcam/upload maior */}
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent className="min-w-3xl">
          <DialogHeader>
            <DialogTitle>Carregar foto</DialogTitle>
          </DialogHeader>

          <PhotoContent initialImage={previewImage} onSave={setPreviewImage} />

          <DialogFooter className="mt-5">
            <Button onClick={() => setOpen(false)}>
              <X /> Cancelar
            </Button>
            <Button variant="sunset" onClick={() => handleSave(previewImage || "")}>
              <Save /> Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
