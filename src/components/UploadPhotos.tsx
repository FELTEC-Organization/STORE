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

// ===============================
// COMPONENTE INTERNO PhotoContent
// ===============================
function PhotoContent({
  icon,
  placeholderText,
  initialImage,
  onSave,
}: PhotoContentProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(initialImage);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [confirmedImage, setConfirmedImage] = useState<string | null>(initialImage);

  // Captura imagem da webcam
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  // Abre a webcam
  const handleWebcamClick = () => {
    setOpenWebcam(true);
    setCapturedImage(null);
    setConfirmedImage(null);
  };

  // Upload tradicional via input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Leitura de imagem selecionada
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  // Leitura de imagem arrastada
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    readFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Função genérica para ler arquivo e converter para base64
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCapturedImage(base64String);
      setConfirmedImage(base64String);
      onSave(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Se a webcam estiver aberta */}
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
                    setConfirmedImage(capturedImage);
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
        // Se já tiver imagem capturada
        <div className="relative inline-block">
          <img
            src={capturedImage}
            alt="Captura"
            className="rounded-md border object-cover h-72 w-96"
          />
          <Button
            className="absolute -top-1 -right-1 p-2 rounded-full bg-transparent hover:bg-transparent"
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
        // Placeholder + área de drop
        <div
          className="border border-adventure rounded-md p-8 flex flex-col items-center justify-center my-2 h-72 w-96 transition-colors hover:bg-muted/50 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {icon}
          <p className="mt-2 text-muted-foreground text-sm text-center">
            {placeholderText} <br />
            <span className="text-xs text-muted-foreground/70">
              (Arraste e solte uma imagem aqui)
            </span>
          </p>
        </div>
      )}

      {/* Botões inferiores */}
      {!openWebcam && (
        <div className="flex gap-2 mt-4">
          <Button variant="adventure" onClick={handleUploadClick}>
            <Upload /> Enviar foto
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="adventure" onClick={handleWebcamClick}>
            <WebcamIcon /> Webcam
          </Button>
        </div>
      )}
    </div>
  );
}

// ==========================
// COMPONENTE PRINCIPAL
// ==========================
export default function SectionPhotos({
  photoResident,
  setPhotoResident,
}: SectionPhotosProps) {
  const [modalType, setModalType] = useState<"resident" | null>(null);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Abre modal
  const openModal = (type: "resident") => {
    setModalType(type);
    setPreviewImage(photoResident);
    setOpen(true);
  };

  // Salva imagem confirmada
  const handleSave = (image: string) => {
    const displayImage =
      image && image.startsWith("data:")
        ? image
        : image
        ? `data:image/jpeg;base64,${image}`
        : null;

    if (modalType === "resident") setPhotoResident(displayImage);
    setOpen(false);
  };

  // Drag-and-drop direto no botão principal
  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPhotoResident(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Área principal de foto */}
      <div className="flex flex-1 p-1">
        <Button
          className="flex-1 flex flex-col justify-center items-center outline bg-muted dark:bg-zinc-900 
          dark:hover:bg-zinc-800 transition-colors duration-200 overflow-hidden
          text-black dark:text-white hover:bg-white h-full min-h-96 w-96 relative"
          onClick={() => openModal("resident")}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
              <span>Arraste ou clique para adicionar foto</span>
            </>
          )}
        </Button>
      </div>

      {/* Modal de captura/upload */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Carregar foto</DialogTitle>
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
              placeholderText="Foto"
              initialImage={previewImage}
              onSave={setPreviewImage}
            />
          )}

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
