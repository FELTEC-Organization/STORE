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
  WebcamIcon,
  Upload,
  Camera,
  ImageUp,
  FileLock2,
  Save,
} from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

// Tipos das props
type SectionPhotosProps = {
  photoResident: string | null;
  setPhotoResident: (photo: string | null) => void;
};

type PhotoContentProps = {
  icon: React.ReactNode;
  placeholderText: string;
  initialImage: string | null;
  onSave: (image: string) => void;
};

// Componente genérico de conteúdo da foto
function PhotoContent({
  icon,
  placeholderText,
  initialImage,
  onSave,
}: PhotoContentProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { t } = useTranslation();

  const [capturedImage, setCapturedImage] = useState<string | null>(
    initialImage
  );
  const [openWebcam, setOpenWebcam] = useState(false);
  const [confirmedImage, setConfirmedImage] = useState<string | null>(
    initialImage
  );

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const handleWebcamClick = () => {
    setOpenWebcam(true);
    setCapturedImage(null);
    setConfirmedImage(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCapturedImage(base64String);
      setConfirmedImage(base64String);
      onSave(base64String);
    };
    reader.readAsDataURL(file); // Converte a imagem para Base64
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
              width={300}
              height={280}
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={() => setCapturedImage(null)}>
                {"Refazer"}
              </Button>
              <Button
                onClick={() => {
                  if (capturedImage) {
                    setConfirmedImage(capturedImage);
                    onSave(capturedImage);
                    setOpenWebcam(false);
                  }
                }}
              >
                {"Confirmar"}
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
              width={300}
              height={280}
            />
            <Button className="mt-2" variant="outline" onClick={capture}>
              <Camera /> {"Capturar"}
            </Button>
          </div>
        )
      ) : capturedImage ? (
        <div className="relative inline-block">
          <img
            src={capturedImage}
            alt="Captura"
            className="rounded-md border object-cover w-80 h-60"
          />
          <Button
            className="absolute -top-1 -right-1 p-2 rounded-full bg-trasparent hover:bg-transparent"
            onClick={() => {
              setCapturedImage(null);
              setConfirmedImage(null);
              onSave("");
            }}
          >
            <X className="!w-5 !h-5" />
          </Button>
        </div>
      ) : (
        <div className="border rounded-md p-8 flex flex-col items-center justify-center my-2 h-70 w-70">
          {icon}
          <p className="mt-2 text-muted-foreground text-sm">
            {placeholderText}
          </p>
        </div>
      )}

      {!openWebcam && (
        <div className="flex gap-2 mt-4">
          {/* Botão de upload */}
          <Button variant="outline" onClick={handleUploadClick}>
            <Upload /> {"Enviar foto"}
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Botão de webcam */}
          <Button variant="outline" onClick={handleWebcamClick}>
            <WebcamIcon /> {"Webcam"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SectionPhotos({
  photoResident,
  setPhotoResident,
}: SectionPhotosProps) {
  // const { t } = useTranslation();
  const [modalType, setModalType] = useState<"resident" | null>(null);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const openModal = (type: "resident") => {
    setModalType(type);
    setPreviewImage(photoResident);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSave = (image: string) => {
    const displayImage =
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      image && image.startsWith("data:")
        ? image
        : image
        ? `data:image/jpeg;base64,${image}`
        : null;

    if (modalType === "resident") setPhotoResident(displayImage);
    closeModal();
  };

  return (
    <>
      <div className="flex flex-1 p-1">
        <Button
          className="flex-1 flex flex-col justify-center items-center outline bg-zinc-200 dark:bg-zinc-900 
          dark:hover:bg-zinc-800 
          transition-colors duration-200
          overflow-hidden text-black dark:text-white hover:bg-muted h-full min-h-[442] w-96"
          onClick={() => openModal("resident")}
        >
          {photoResident ? (
            <img
              src={photoResident}
              alt="Foto"
              className="rounded w-96 h-96 object-cover"
            />
          ) : (
            <>
              <ImageUp className="!w-6 !h-6 text-nc-neutral-700" />
              <span>{"Foto"}</span>
            </>
          )}
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpen(false);
          }
        }}
      >
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Fazer o upload de foto</DialogTitle>
          </DialogHeader>

          {modalType && (
            <PhotoContent
              icon={
                modalType === "resident" ? (
                  <ImageUp className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <FileLock2 className="w-6 h-6 text-muted-foreground" />
                )
              }
              placeholderText={"Foto"}
              initialImage={previewImage}
              onSave={setPreviewImage}
            />
          )}

          <DialogFooter className="mt-5">
            <Button onClick={() => setOpen(false)}>
              <X /> {"Cancelar"}
            </Button>
            <Button onClick={() => handleSave(previewImage || "")}>
              <Save /> {"Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
