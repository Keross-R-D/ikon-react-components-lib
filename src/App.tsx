import "./styles.css";
import { useState } from "react";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { FileUploader, type FileObjType } from "./ikoncomponents/fileUpload";
import { getImageFromObject } from "./ikoncomponents/fileUpload/utils";
import { DataTableLayout } from "./ikoncomponents/table";
import { useReactTable } from "@tanstack/react-table";
import { ColumnsProps } from "./ikoncomponents/table/type";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

const data = [
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0205ac5e-e1a5-4b8e-9dea-cdcb2b6f13cf",
        "leadName": "Lead Anushri",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "advertising",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "india",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "6ca47be2-e294-4491-839a-bf464c89bc85"
        ],
        "leadStatus": "Recall Lead From Discovery",
        "updatedOn": "2026-03-26T11:58:54.791277700",
        "updatedBy": "6ca47be2-e294-4491-839a-bf464c89bc85",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0dff5973-89dd-428b-95eb-bf4d19e2076f",
        "leadName": "Lead Anushri 13",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:34:43.511138300",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "11a678df-316c-4998-877f-2b7b91e4143e",
        "leadName": "Lead Anushri 1",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "armenia",
        "landmark": "RDB",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-11T18:03:42.836912400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "1cb724b3-3da0-4805-9b92-dc223d68df9c",
        "leadName": "Lead Access Control 2",
        "email": "sudip.bhuniya@keross.com",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "argentina",
        "landmark": "",
        "salesManager": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "d2f3665a-551f-413c-86b0-8a1ec42b876e"
        ],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-20T16:17:18.215421100",
        "updatedBy": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "342946ea-8ad4-411e-bc18-41031d688dec",
        "leadName": " Lead Anushri 14",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:36:36.764697400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
      {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0205ac5e-e1a5-4b8e-9dea-cdcb2b6f13cf",
        "leadName": "Lead Anushri",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "advertising",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "india",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "6ca47be2-e294-4491-839a-bf464c89bc85"
        ],
        "leadStatus": "Recall Lead From Discovery",
        "updatedOn": "2026-03-26T11:58:54.791277700",
        "updatedBy": "6ca47be2-e294-4491-839a-bf464c89bc85",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0dff5973-89dd-428b-95eb-bf4d19e2076f",
        "leadName": "Lead Anushri 13",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:34:43.511138300",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "11a678df-316c-4998-877f-2b7b91e4143e",
        "leadName": "Lead Anushri 1",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "armenia",
        "landmark": "RDB",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-11T18:03:42.836912400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "1cb724b3-3da0-4805-9b92-dc223d68df9c",
        "leadName": "Lead Access Control 2",
        "email": "sudip.bhuniya@keross.com",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "argentina",
        "landmark": "",
        "salesManager": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "d2f3665a-551f-413c-86b0-8a1ec42b876e"
        ],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-20T16:17:18.215421100",
        "updatedBy": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "342946ea-8ad4-411e-bc18-41031d688dec",
        "leadName": " Lead Anushri 14",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:36:36.764697400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },  {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0205ac5e-e1a5-4b8e-9dea-cdcb2b6f13cf",
        "leadName": "Lead Anushri",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "advertising",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "india",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "6ca47be2-e294-4491-839a-bf464c89bc85"
        ],
        "leadStatus": "Recall Lead From Discovery",
        "updatedOn": "2026-03-26T11:58:54.791277700",
        "updatedBy": "6ca47be2-e294-4491-839a-bf464c89bc85",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "0dff5973-89dd-428b-95eb-bf4d19e2076f",
        "leadName": "Lead Anushri 13",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:34:43.511138300",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "11a678df-316c-4998-877f-2b7b91e4143e",
        "leadName": "Lead Anushri 1",
        "email": "anushri.dutta@keross.com",
        "orgContactNo": "09748067183",
        "noOfEmployees": "56",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "www.keross.com",
        "street": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pinCode": "700091",
        "country": "armenia",
        "landmark": "RDB",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-11T18:03:42.836912400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "1cb724b3-3da0-4805-9b92-dc223d68df9c",
        "leadName": "Lead Access Control 2",
        "email": "sudip.bhuniya@keross.com",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "argentina",
        "landmark": "",
        "salesManager": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "salesTeam": [
            "381e5000-d9b7-4323-a9ef-ca2640fc66c4",
            "d2f3665a-551f-413c-86b0-8a1ec42b876e"
        ],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-20T16:17:18.215421100",
        "updatedBy": "f8e2d6b3-07ab-462f-ae4e-07cd0b2d2427",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    },
    {
        "accountId": "b8bbe5c9-ad0d-4874-b563-275a86e4b818",
        "leadIdentifier": "342946ea-8ad4-411e-bc18-41031d688dec",
        "leadName": " Lead Anushri 14",
        "email": "",
        "orgContactNo": "",
        "noOfEmployees": "",
        "noOfLeads": "",
        "sector": "",
        "source": "",
        "website": "",
        "street": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "landmark": "",
        "salesManager": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "salesTeam": [],
        "leadStatus": "Lead Created",
        "updatedOn": "2026-03-12T12:36:36.764697400",
        "updatedBy": "d2f3665a-551f-413c-86b0-8a1ec42b876e",
        "contactID": null,
        "commentsLogs": null,
        "dealDetails": null,
        "files": null
    }
]

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
      filterFn: "multiSelect",
    },
    {
      header: "Sales Manager",
      accessorKey: "salesManager",
      
    },
    {
      header: "Actions",
     
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
              currentPage={1}
              // actionNode={<button >Add Lead</button>}
              toggleViewMode={true}
              hiddenColumns={["salesManager"]}
              
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
