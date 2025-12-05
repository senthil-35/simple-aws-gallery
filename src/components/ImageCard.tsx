import { useState } from "react";
import { Trash2, Download, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  title: string;
  uploadedAt: string;
  onDelete?: () => void;
  onView?: () => void;
}

const ImageCard = ({ src, title, uploadedAt, onDelete, onView }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]" />
        )}
        <img
          src={src}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            isHovered && "scale-110"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
      />

      {/* Actions */}
      <div
        className={cn(
          "absolute top-3 right-3 flex gap-2",
          "opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={onView}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Info */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4",
          "opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        <h3 className="font-medium text-primary-foreground truncate">{title}</h3>
        <p className="text-sm text-primary-foreground/70">{uploadedAt}</p>
      </div>
    </div>
  );
};

export default ImageCard;
