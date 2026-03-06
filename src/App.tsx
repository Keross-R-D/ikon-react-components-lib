import "./styles.css";
import { useState } from "react";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { ImageCropperProvider, type AspectRatioWiseImagesProps, type OriginalImageProps } from "./ikoncomponents/image-cropper-upload";
import { CropperForm } from "./ikoncomponents/image-cropper-upload/cropper-form";
import { FileUploader, type FileObjType } from "./ikoncomponents/fileUpload";
import { getImageFromObject } from "./ikoncomponents/fileUpload/utils";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

function App() {
 // const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleFileSelect = async (fileObj: FileObjType) => {
    console.log("Received File Object:", fileObj);
    
    if (fileObj.type.startsWith("image/")) {
      const imgUrl = getImageFromObject(fileObj);
      console.log("Preview URL:", imgUrl);
      setImgSrc(imgUrl);
    }
  };

  return (
    <>
      <ProviderWrapper>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">File Upload Test</h2>
            <FileUploader
              label="Upload Your File"
              isDrag={true}
              onFileSelect={handleFileSelect}
            />
            {imgSrc && <img src={imgSrc} className="w-40 h-40 mt-4" />}
          </div>

          {/* <div>
            <h2 className="text-2xl font-bold mb-4">Image Cropper Test</h2>
            <ImageCropperProvider
              uploadedImages={null}
              onCropperChange={(originalImage: OriginalImageProps, aspectRatioWiseImages: AspectRatioWiseImagesProps) => {
                console.log("Cropper changed:", { originalImage, aspectRatioWiseImages });
              }}
              modalOpen={modalOpen}
              onModalOpenChange={setModalOpen}
            >
              <CropperForm />
            </ImageCropperProvider>
          </div> */}
        </div>
      </ProviderWrapper>
    </>
  );
}

export default App;
