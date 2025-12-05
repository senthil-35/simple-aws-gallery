import { Cloud, Upload, BookOpen, Home } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Cloud className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent animate-pulse" />
          </div>
          <span className="text-xl font-bold text-foreground">
            AWS <span className="text-gradient">Gallery</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            )}
            activeClassName="text-foreground bg-muted"
          >
            <Home className="h-4 w-4" />
            Gallery
          </NavLink>
          <NavLink
            to="/upload"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            )}
            activeClassName="text-foreground bg-muted"
          >
            <Upload className="h-4 w-4" />
            Upload
          </NavLink>
          <NavLink
            to="/docs"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            )}
            activeClassName="text-foreground bg-muted"
          >
            <BookOpen className="h-4 w-4" />
            Setup Guide
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
