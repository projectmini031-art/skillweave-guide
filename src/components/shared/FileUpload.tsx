import { useCallback, useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
}

const FileUpload = ({ onFileSelect, accept = ".pdf,.doc,.docx", maxSize = 10 }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = accept.split(",").map((t) => t.trim());
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    
    if (!validTypes.some((type) => fileExtension.includes(type.replace(".", "")))) {
      setError(`Invalid file type. Please upload ${accept} files.`);
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    if (!validateFile(file)) return;

    setFile(file);
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      onFileSelect(file);
    }, 1500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploaded(false);
    setError(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 text-center",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag & drop your resume</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (PDF, DOC, DOCX up to {maxSize}MB)
              </p>
            </div>
            <Button variant="outline" className="mt-2">
              Browse Files
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-3 rounded-lg",
                  uploaded ? "bg-success/10" : "bg-primary/10"
                )}
              >
                {uploading ? (
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : uploaded ? (
                  <CheckCircle className="h-6 w-6 text-success" />
                ) : (
                  <FileText className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {uploading && (
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary animate-pulse w-3/4" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
            </div>
          )}
          
          {uploaded && (
            <p className="text-sm text-success mt-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Resume uploaded successfully!
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
