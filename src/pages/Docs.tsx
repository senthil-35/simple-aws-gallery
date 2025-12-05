import Header from "@/components/Header";
import CodeBlock from "@/components/CodeBlock";
import StepCard from "@/components/StepCard";
import { 
  Server, 
  Database, 
  Shield, 
  Key, 
  Activity, 
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Free Tier Eligible</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AWS Setup Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete step-by-step instructions to deploy your image gallery on AWS. 
              Beginner-friendly with security best practices.
            </p>
          </div>

          {/* Prerequisites */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Prerequisites
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                AWS Account (Free Tier eligible)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                Basic understanding of terminal/command line
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                Git installed on your local machine
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                Node.js 18+ installed
              </li>
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1: IAM */}
            <StepCard
              number={1}
              title="Create IAM User & Policies"
              description="Create a dedicated IAM user with minimal permissions following the principle of least privilege."
              icon={Key}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create a policy named <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">ImageGalleryS3Policy</code>:
                </p>
                <CodeBlock
                  title="IAM Policy (JSON)"
                  language="json"
                  code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-gallery-bucket",
        "arn:aws:s3:::your-gallery-bucket/*"
      ]
    }
  ]
}`}
                />
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Security Tip:</strong> Never use root credentials. 
                    Create a dedicated IAM user and rotate access keys regularly.
                  </p>
                </div>
              </div>
            </StepCard>

            {/* Step 2: S3 */}
            <StepCard
              number={2}
              title="Create S3 Bucket"
              description="Set up a secure S3 bucket for storing images with encryption and proper access controls."
              icon={Database}
            >
              <div className="space-y-4">
                <CodeBlock
                  title="AWS CLI Commands"
                  language="bash"
                  code={`# Create the bucket (replace with your bucket name and region)
aws s3api create-bucket \\
  --bucket your-gallery-bucket \\
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \\
  --bucket your-gallery-bucket \\
  --versioning-configuration Status=Enabled

# Enable server-side encryption
aws s3api put-bucket-encryption \\
  --bucket your-gallery-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        }
      }
    ]
  }'

# Block public access (security best practice)
aws s3api put-public-access-block \\
  --bucket your-gallery-bucket \\
  --public-access-block-configuration '{
    "BlockPublicAcls": true,
    "IgnorePublicAcls": true,
    "BlockPublicPolicy": true,
    "RestrictPublicBuckets": true
  }'`}
                />
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Free Tier:</strong> S3 includes 5GB storage, 
                    20,000 GET requests, and 2,000 PUT requests per month.
                  </p>
                </div>
              </div>
            </StepCard>

            {/* Step 3: Security Groups */}
            <StepCard
              number={3}
              title="Configure Security Groups"
              description="Create a security group that only allows necessary inbound traffic to your EC2 instance."
              icon={Shield}
            >
              <div className="space-y-4">
                <CodeBlock
                  title="Security Group Configuration"
                  language="bash"
                  code={`# Create security group
aws ec2 create-security-group \\
  --group-name ImageGallerySG \\
  --description "Security group for Image Gallery EC2"

# Allow SSH (restrict to your IP in production)
aws ec2 authorize-security-group-ingress \\
  --group-name ImageGallerySG \\
  --protocol tcp \\
  --port 22 \\
  --cidr YOUR_IP/32

# Allow HTTP
aws ec2 authorize-security-group-ingress \\
  --group-name ImageGallerySG \\
  --protocol tcp \\
  --port 80 \\
  --cidr 0.0.0.0/0

# Allow HTTPS
aws ec2 authorize-security-group-ingress \\
  --group-name ImageGallerySG \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0`}
                />
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Warning:</strong> Never allow SSH (port 22) from 0.0.0.0/0. 
                    Always restrict to your specific IP address.
                  </p>
                </div>
              </div>
            </StepCard>

            {/* Step 4: EC2 */}
            <StepCard
              number={4}
              title="Launch EC2 Instance"
              description="Deploy a Free Tier eligible t2.micro instance with Amazon Linux 2023."
              icon={Server}
            >
              <div className="space-y-4">
                <CodeBlock
                  title="EC2 Launch & Setup"
                  language="bash"
                  code={`# Launch EC2 instance (Free Tier: t2.micro)
aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\
  --instance-type t2.micro \\
  --key-name your-key-pair \\
  --security-groups ImageGallerySG \\
  --iam-instance-profile Name=ImageGalleryRole

# SSH into your instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js and Git
sudo yum update -y
sudo yum install -y git
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone and setup the application
git clone https://github.com/your-repo/image-gallery.git
cd image-gallery
npm install
npm run build

# Install and configure nginx
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx`}
                />
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Free Tier:</strong> 750 hours/month of t2.micro 
                    instance usage for the first 12 months.
                  </p>
                </div>
              </div>
            </StepCard>

            {/* Step 5: CloudWatch */}
            <StepCard
              number={5}
              title="Set Up CloudWatch Monitoring"
              description="Configure CloudWatch to monitor your EC2 instance and set up alerts."
              icon={Activity}
            >
              <div className="space-y-4">
                <CodeBlock
                  title="CloudWatch Alarm Configuration"
                  language="bash"
                  code={`# Create CPU utilization alarm
aws cloudwatch put-metric-alarm \\
  --alarm-name "High-CPU-ImageGallery" \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 300 \\
  --threshold 80 \\
  --comparison-operator GreaterThanThreshold \\
  --dimensions Name=InstanceId,Value=i-YOUR_INSTANCE_ID \\
  --evaluation-periods 2 \\
  --alarm-actions arn:aws:sns:us-east-1:YOUR_ACCOUNT:alerts

# Enable detailed monitoring (optional, not free tier)
aws ec2 monitor-instances --instance-ids i-YOUR_INSTANCE_ID

# Create custom log group
aws logs create-log-group \\
  --log-group-name /aws/ec2/image-gallery`}
                />
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Free Tier:</strong> 10 custom metrics, 10 alarms, 
                    1M API requests, and 5GB log data ingestion per month.
                  </p>
                </div>
              </div>
            </StepCard>

            {/* Step 6: Git */}
            <StepCard
              number={6}
              title="Version Control with Git"
              description="Set up Git for code management and continuous deployment."
              icon={GitBranch}
            >
              <div className="space-y-4">
                <CodeBlock
                  title="Git Setup"
                  language="bash"
                  code={`# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub/GitLab
git remote add origin https://github.com/your-username/image-gallery.git
git push -u origin main

# Create .gitignore
cat << EOF > .gitignore
node_modules/
.env
*.pem
.DS_Store
dist/
EOF

# Set up deployment script
cat << 'EOF' > deploy.sh
#!/bin/bash
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
EOF
chmod +x deploy.sh`}
                />
              </div>
            </StepCard>
          </div>

          {/* Backend Code Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Backend Code (Node.js)</h2>
            <p className="text-muted-foreground">
              Here's the Express.js backend code to handle image uploads to S3:
            </p>

            <CodeBlock
              title="server.js"
              language="javascript"
              code={`const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const key = \`images/\${Date.now()}-\${file.originalname}\`;

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    res.json({ success: true, key });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// List images endpoint
app.get('/api/images', async (req, res) => {
  try {
    const data = await s3Client.send(new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'images/',
    }));

    const images = data.Contents?.map(item => ({
      key: item.Key,
      lastModified: item.LastModified,
      size: item.Size,
    })) || [];

    res.json(images);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

// Delete endpoint
app.delete('/api/images/:key', async (req, res) => {
  try {
    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: decodeURIComponent(req.params.key),
    }));

    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
            />

            <CodeBlock
              title=".env.example"
              language="bash"
              code={`AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your-gallery-bucket
PORT=3000`}
            />

            <CodeBlock
              title="package.json dependencies"
              language="json"
              code={`{
  "dependencies": {
    "@aws-sdk/client-s3": "^3.0.0",
    "@aws-sdk/s3-request-presigner": "^3.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "multer": "^1.4.5-lts.1"
  }
}`}
            />
          </div>

          {/* Security Best Practices */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security Best Practices
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Use IAM roles instead of hardcoded credentials when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Enable S3 bucket versioning to protect against accidental deletions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Block all public access to your S3 bucket</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Restrict SSH access to your specific IP address</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Enable CloudWatch alarms for unusual activity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Rotate IAM access keys every 90 days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Enable MFA for your AWS root account</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span>Never commit .env files or credentials to Git</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button variant="accent" size="lg" asChild>
              <a href="https://aws.amazon.com/free" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Get Started with AWS Free Tier
              </a>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            AWS Image Gallery • Built with React, Tailwind CSS, and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Docs;
