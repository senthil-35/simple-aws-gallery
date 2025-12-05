import { X, Download, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title: string;
    uploadedAt: string;
  } | null;
}

const ImageModal = ({ isOpen, onClose, image }: ImageModalProps) => {
  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className={cn(
          "relative max-w-4xl w-full max-h-[90vh] rounded-2xl bg-card shadow-2xl overflow-hidden",
          "animate-scale-in"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image */}
        <div className="relative">
          <img
            src={image.src}
            alt={image.title}
            className="w-full max-h-[70vh] object-contain bg-muted"
          />
        </div>

        {/* Info bar */}
        <div className="p-4 flex items-center justify-between border-t border-border">
          <div>
            <h3 className="font-semibold text-foreground">{image.title}</h3>
            <p className="text-sm text-muted-foreground">{image.uploadedAt}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
