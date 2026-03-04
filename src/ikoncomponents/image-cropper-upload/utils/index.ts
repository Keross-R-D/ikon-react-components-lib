import type { AspectRatioWiseImagesProps, OriginalImageProps } from "..";
import type { FileinfoProps } from "../../../utils/api/file/type";
import { singleFileUpload, base64FileUpload, getResourceUrl } from "../../../utils/api/file";

export interface CropperUploadImagesInfoProps {
  originalImageInfo?: FileinfoProps | null;
  imageName?: string;
  imageDescription?: string;
  landscapeImageInfo?: FileinfoProps | null;
  portraitImageInfo?: FileinfoProps | null;
  iconImageInfo?: FileinfoProps | null;
}
export interface UploadedImagesToCropperImgObjProps {
  originalImage: OriginalImageProps;
  aspectRatioWiseImages: AspectRatioWiseImagesProps;
}
export async function imageCropperFilesUpload(
  originalImage: OriginalImageProps,
  aspectRatioWiseImages?: AspectRatioWiseImagesProps
): Promise<CropperUploadImagesInfoProps | null> {
  if (!originalImage.image) {
    return null;
  }

  const originalImageInfo = await singleFileUpload(
    originalImage.image as File
  );

  const cropperUploadImagesInfo: CropperUploadImagesInfoProps = {
    originalImageInfo: originalImageInfo,
    imageName: originalImage.name,
    imageDescription: originalImage.description,
    landscapeImageInfo: null,
    portraitImageInfo: null,
    iconImageInfo: null,
  };

  if (aspectRatioWiseImages) {
    if (aspectRatioWiseImages.landscape) {
      try {
        cropperUploadImagesInfo["landscapeImageInfo"] = await base64FileUpload(
          aspectRatioWiseImages.landscape,
          originalImage.name + "_L.webp",
          "image/webp"
        );
      } catch (error) {
        console.error(error);
      }
    }
    if (aspectRatioWiseImages.portrait) {
      try {
        cropperUploadImagesInfo["portraitImageInfo"] = await base64FileUpload(
          aspectRatioWiseImages.portrait,
          originalImage.name + "_P.webp",
          "image/webp"
        );
      } catch (error) {
        console.error(error);
      }
    }
    if (aspectRatioWiseImages.icon) {
      try {
        cropperUploadImagesInfo["iconImageInfo"] = await base64FileUpload(
          aspectRatioWiseImages.icon,
          originalImage.name + "_I.webp",
          "image/webp"
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  return cropperUploadImagesInfo;
}

export async function uploadedImagesToCropperImgObj(
  uploadedImages: CropperUploadImagesInfoProps | null
): Promise<UploadedImagesToCropperImgObjProps | null> {
  if (!uploadedImages) {
    return null;
  }

  const originalImageUrl = uploadedImages.originalImageInfo
    ? await getResourceUrl(uploadedImages.originalImageInfo)
    : null;
  const landscapeImageUrl = uploadedImages.landscapeImageInfo
    ? await getResourceUrl(uploadedImages.landscapeImageInfo)
    : null;
  const portraitImageUrl = uploadedImages.portraitImageInfo
    ? await getResourceUrl(uploadedImages.portraitImageInfo)
    : null;
  const iconImageUrl = uploadedImages.iconImageInfo
    ? await getResourceUrl(uploadedImages.iconImageInfo)
    : null;

  const obj: UploadedImagesToCropperImgObjProps = {
    originalImage: {
      image: originalImageUrl,
      name: uploadedImages.imageName,
      description: uploadedImages.imageDescription,
    },
    aspectRatioWiseImages: {
      landscape: landscapeImageUrl,
      portrait: portraitImageUrl,
      icon: iconImageUrl,
    },
  };

  return obj;
}
