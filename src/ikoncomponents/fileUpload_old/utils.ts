// --- Type Definition ---
export interface FileObjType {
  message: string;
  fileName: string;
  size: number;
  type: string;
  lastModified: number;
  base64: string;
}

// --- Helper: Convert File to Object with Base64 ---
export const convertFileToObject = async (file: File) => {
  return new Promise<FileObjType>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1]; // Extract base64 from data URL
      resolve({
        message: "File processed successfully",
        fileName: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        base64: base64,
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

// --- Helper Function: Recreate Image from File Object ---
export function getImageFromObject(obj: FileObjType) {
  const byteCharacters = atob(obj.base64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: obj.type });

  return URL.createObjectURL(blob); // usable in <img src="..." />
}
