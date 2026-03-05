import "./styles.css";
import { useState } from "react";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { ImageCropperProvider, type AspectRatioWiseImagesProps, type OriginalImageProps } from "./ikoncomponents/image-cropper-upload";
import { CropperForm } from "./ikoncomponents/image-cropper-upload/cropper-form";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ProviderWrapper>
        <div className="p-6">
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
        </div>
      </ProviderWrapper>
    </>
  );
}

export default App;
