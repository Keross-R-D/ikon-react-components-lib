
import React, { useState, type DragEvent } from "react";
import { UploadCloud, FileUp } from "lucide-react";
import { convertFileToObject, type FileObjType } from "./utils";

export interface FileUploaderProps {
  label?: string;
  isDrag?: boolean; // enable or disable drag & drop
  onFileSelect: (fileObj: FileObjType) => Promise<FileObjType> | Promise<void> | void; // now returns object with base64
}
// --- Helper: Convert File to Object with Base64 ---
// Moved to utils.ts to comply with react-refresh/only-export-components rule

export function FileUploader({
  label = "Upload File",
  isDrag = false,
  onFileSelect,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    const fileObj: FileObjType = await convertFileToObject(file); // convert to object
    await onFileSelect(fileObj); // pass object to parent
  };

  // ---- DRAG HANDLERS ----
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (!isDrag) return;
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* ----- DRAG & DROP VERSION ----- */}
      {isDrag ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="w-10 h-10 text-blue-600" />
            <p className="text-gray-600">
              Drag & drop your file here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
          </div>
        </div>
      ) : (
        // ----- SIMPLE UPLOAD BOX -----
        <div
          className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer text-center"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FileUp className="w-8 h-8 text-blue-600" />
          <span className="text-blue-600 underline">Browse File</span>
        </div>
      )}
    </div>
  );
}

export type { FileObjType };
