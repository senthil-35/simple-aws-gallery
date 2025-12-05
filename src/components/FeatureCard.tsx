import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group rounded-2xl bg-card border border-border p-6",
        "transition-all duration-300 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1",
        className
      )}
    >
      <div className="h-12 w-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon className="h-6 w-6 text-accent-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
