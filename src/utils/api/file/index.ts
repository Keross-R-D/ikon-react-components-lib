export { singleFileUpload, base64FileUpload, useFileUpload, useBase64FileUpload } from "./upload";
export type { FileinfoProps } from "./type";
import type { FileinfoProps } from "./type";
import { getConfig } from "@/utils/config";

export async function getResourceUrl(
  fileInfo: FileinfoProps | null,
  type: "public" | "platform" | "account" | "" = ""
): Promise<string | null> {
  if (!fileInfo || !fileInfo.resourceId) {
    return null;
  } 

  try {
    const baseUrl = getConfig().IKON_BASE_API_URL;
    // if (type === "public") {
    //   return `${baseUrl}/platform/file-resource/download/public/${fileInfo.resourceId}`;
    // }
    return `${baseUrl}/platform/file-resource/download/${type}/${fileInfo.resourceId}`;
  } catch (error) {
    console.error("Error getting resource URL:", error);
    return null;
  }
}
