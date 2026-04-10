import "./styles.css";
import { useState } from "react";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { FileUploader, type FileObjType } from "./ikoncomponents/fileUpload";
import { getImageFromObject } from "./ikoncomponents/fileUpload/utils";
import { DataTableLayout } from "./ikoncomponents/table";
import { useReactTable } from "@tanstack/react-table";
import { ColumnsProps } from "./ikoncomponents/table/type";
import { data } from "./data";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});



 const columns: ColumnsProps<any>[] = [
    {
      header: "Lead Name",
      accessorKey: "leadName",
      footer: ({ table }:{table: ReturnType<typeof useReactTable>}) => table.options.meta?.footerLabel || "Total",
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (row) => <span>{row.getValue() || "n/a"}</span>,
    },
    {
      header: "Contact No",
      accessorKey: "orgContactNo",
      cell: (row) => {debugger; return <span>{row.getValue() || "n/a"}</span>},
      footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;
      const sum = rows.reduce((acc, row) => acc + (Number(row.getValue("orgContactNo")) || 0), 0);
      return sum.toLocaleString();
    },
    },
    {
      header: "No. of Employees",
      accessorKey: "noOfEmployees",
      cell: (row) => <span>{row.getValue() || "n/a"}</span>,
    },
    {
      header: "Sector",
      accessorKey: "sector",
    },
    {
      header: "Status",
      accessorKey: "leadStatus",
    },
    {
      header: "Sales Manager",
      accessorKey: "salesManager",
      
    },
    {
      header: "Actions",
      draggable: false,
     
    },
  ];

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
            <h2 className="text-2xl font-bold">File Upload Test</h2>
            {/* <FileUploader
              label="Upload Your File"
              isDrag={true}
              onFileSelect={handleFileSelect}
            /> */}
            <DataTableLayout 
              data={data}
              columns={columns}
              totalPages={2}
              // actionNode={<button >Add Lead</button>}
              toggleViewMode={true}
              hiddenColumns={["salesManager"]}
              fileName={"Lead_Data"}
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
