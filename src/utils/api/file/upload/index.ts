import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosAuth";
import { getConfig } from "@/utils/config";
import type { FileinfoProps } from "../type";

export function useFileUpload() {
  return useMutation({
    mutationFn: async ({
      file,
      type
    } : {
      file: File,
      type: "public" | "platform" | "account"
    }): Promise<FileinfoProps[]> => {
      const formData = new FormData();
      formData.append("file", file);

      const fileResponse: FileinfoProps[] = await axiosInstance.post(
        `${getConfig().IKON_BASE_API_URL}/platform/file-resource/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return fileResponse;
    },
  });
}

export function useBase64FileUpload() {
  const singleUpload = useFileUpload();

  return useMutation({
    mutationFn: async ({
      base64File,
      type,
      resourceName,
      resourceType,
    }: {
      base64File: string;
      type: "public" | "platform" | "account";
      resourceName: string;
      resourceType: string;
    }) => {
      const base64 = base64File.split(",")[1];
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: resourceType });
      const file = new File([blob], resourceName, { type: resourceType });

      return await singleUpload.mutateAsync({
        file,
        type,
      });
    },
  });
}

// Non-hook versions for use outside React components
export async function singleFileUpload(file: File): Promise<FileinfoProps> {
  const formData = new FormData();
  formData.append("file", file);

  const fileResponse: FileinfoProps[] = await axiosInstance.post(
    `${getConfig().IKON_BASE_API_URL}/platform/file-resource/platform`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return fileResponse[0];
}

export async function base64FileUpload(
  base64File: string,
  resourceName: string,
  resourceType: string
): Promise<FileinfoProps> {
  const base64 = base64File.split(",")[1];
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: resourceType });
  const file = new File([blob], resourceName, { type: resourceType });

  return await singleFileUpload(file);
}

