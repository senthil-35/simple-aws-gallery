import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

const StepCard = ({ number, title, description, icon: Icon, children }: StepCardProps) => {
  return (
    <div className="relative">
      {/* Step number badge */}
      <div className="absolute -left-4 top-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full gradient-accent flex items-center justify-center shadow-lg">
          <span className="text-sm font-bold text-accent-foreground">{number}</span>
        </div>
      </div>

      <div className={cn(
        "ml-8 rounded-2xl bg-card border border-border p-6 shadow-md",
        "transition-all duration-300 hover:shadow-lg hover:border-accent/30"
      )}>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default StepCard;
