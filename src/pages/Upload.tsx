import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const Upload = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Images
            </h1>
            <p className="text-muted-foreground">
              Images will be securely stored in Amazon S3 with server-side encryption.
            </p>
          </div>

          {/* Upload Zone */}
          <UploadZone />

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Supported Formats</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG, JPEG, PNG, GIF, WebP, and SVG files up to 10MB each.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Security Note</h3>
                  <p className="text-sm text-muted-foreground">
                    All uploads are encrypted at rest using AES-256 server-side encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-10 p-6 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Demo Mode</h3>
                <p className="text-sm text-muted-foreground">
                  This is a frontend demo. To enable actual S3 uploads, you need to set up the AWS backend 
                  following our <a href="/docs" className="text-accent hover:underline">Setup Guide</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
