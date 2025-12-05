import { useState } from "react";
import { Cloud, Server, Database, Shield, Activity, Image } from "lucide-react";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

// Sample images for demo
const sampleImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    title: "Mountain Landscape",
    uploadedAt: "2 hours ago",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop",
    title: "Starry Night",
    uploadedAt: "5 hours ago",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop",
    title: "Lake Reflection",
    uploadedAt: "1 day ago",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop",
    title: "Forest Path",
    uploadedAt: "2 days ago",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=600&fit=crop",
    title: "Waterfall",
    uploadedAt: "3 days ago",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop",
    title: "Foggy Hills",
    uploadedAt: "4 days ago",
  },
];

const features = [
  {
    title: "EC2 Instance",
    description: "Host your web application on a Free Tier eligible t2.micro instance",
    icon: Server,
  },
  {
    title: "S3 Storage",
    description: "Store images securely with server-side encryption and versioning",
    icon: Database,
  },
  {
    title: "IAM Security",
    description: "Fine-grained access control with least privilege principles",
    icon: Shield,
  },
  {
    title: "CloudWatch",
    description: "Monitor your application with logs, metrics, and alarms",
    icon: Activity,
  },
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<typeof sampleImages[0] | null>(null);
  const [images, setImages] = useState(sampleImages);

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6 animate-fade-in">
              <Cloud className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">
                AWS Free Tier Eligible
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Cloud Image Gallery
              <span className="block mt-2 text-accent">Powered by AWS</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              A beginner-friendly image gallery using EC2, S3, IAM, Security Groups, and CloudWatch. 
              Upload, store, and display images securely in the cloud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <NavLink to="/upload">
                <Button variant="accent" size="xl">
                  <Image className="mr-2 h-5 w-5" />
                  Upload Images
                </Button>
              </NavLink>
              <NavLink to="/docs">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  View Setup Guide
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">AWS Services Used</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This project demonstrates integration with core AWS services, all within Free Tier limits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 gradient-subtle">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Image Gallery</h2>
              <p className="text-muted-foreground">
                {images.length} images stored in S3
              </p>
            </div>
            <NavLink to="/upload">
              <Button variant="accent">
                <Image className="mr-2 h-4 w-4" />
                Upload New
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ImageCard
                  {...image}
                  onView={() => setSelectedImage(image)}
                  onDelete={() => handleDelete(image.id)}
                />
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">Upload your first image to get started</p>
              <NavLink to="/upload">
                <Button variant="accent">Upload Images</Button>
              </NavLink>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            AWS Image Gallery • Built with React, Tailwind CSS, and ❤️
          </p>
        </div>
      </footer>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
};

export default Index;
