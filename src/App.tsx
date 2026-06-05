import "./styles.css";
import { useState } from "react";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { type FileObjType } from "./ikoncomponents/fileUpload_old";
import { getImageFromObject } from "./ikoncomponents/fileUpload_old/utils";
import { DataTableLayout } from "./ikoncomponents/table";
import { useReactTable } from "@tanstack/react-table";
import { ColumnsProps, ExtraPrams } from "./ikoncomponents/table/type";
import { data } from "./data";
import { Workflow, type WorkflowStep } from "./shadcn/ui/workflow";
import { ComboboxInput } from "./ikoncomponents/combobox-input";
import { Delete, Edit, FileText, Home, ShoppingCart } from "lucide-react";
import { RenderSidebarNav } from "./ikoncomponents/main-layout/nav-main";
import { SidebarNavItem } from "./ikoncomponents/main-layout/SidebarNavContext";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

const columns: ColumnsProps<any>[] = [
  {
    header: "Lead Name",
    accessorKey: "leadName",
    footer: ({ table }: { table: ReturnType<typeof useReactTable> }) =>
      table.options.meta?.footerLabel || "Total",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (row) => <span>{row.getValue() || "n/a"}</span>,
  },
  {
    header: "Contact No",
    accessorKey: "orgContactNo",
    cell: (row) => {
      debugger;
      return <span>{row.getValue() || "n/a"}</span>;
    },
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;
      const sum = rows.reduce(
        (acc, row) => acc + (Number(row.getValue("orgContactNo")) || 0),
        0,
      );
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
];

const extraTools: ExtraPrams<T> = {};

const salesPipeline: WorkflowStep[] = [
  {
    title: "Deal",
    owner: "System",
    status: "IN PROGRESS",
    createdAt: "2024-01-10",
    dropdownOptions: [<h1>Hello</h1>],
  },
  {
    title: "Product",
    owner: "System",
    status: "OUTSTANDING",
    createdAt: "2024-02-18",
  },
  {
    title: "Quotation",
    owner: "Baishali Roy Chowdhary",
    status: "OUTSTANDING",
    createdAt: "2024-03-05",
  },
  {
    title: "Sales Review",
    owner: "Baishali Roy Chowdhary",
    status: "OUTSTANDING",
    createdAt: "2024-04-12",
  },
  {
    title: "Client Review",
    owner: "Baishali Roy Chowdhary",
    status: "OUTSTANDING",
    createdAt: "2024-05-03",
  },
  {
    title: "Won",
    owner: "Baishali Roy Chowdhary",
    status: "OUTSTANDING",
    createdAt: "2024-06-01",
  },
];

const navItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Requisitions",
    url: "/requisitions",
    icon: FileText,
  },
  {
    title: "Purchase Orders",
    url: "/purchase-orders",
    icon: ShoppingCart,
  },
]

function App() {
  // const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const length = data.length;
  console.log("data length-->", length)

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
      {/* 1. Inject a global style tag to catch Portals/Dropdowns*/}
      <style>{`
        body {
          font-family: 'Poppins', sans-serif !important;
        }
      `}</style>
      {/* <div style={styles.poppins} className="min-h-screen"> */}
      <ProviderWrapper>
        <div>
          <RenderSidebarNav items={navItems} />
          <div className="p-6">
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl font-bold">File Upload Test</h2>
              {/* <FileUploader
              label="Upload Your File"
              isDrag={true}
              onFileSelect={handleFileSelect}
            /> */}
              <DataTableLayout
                data={data}
                columns={columns}
                extraTools={{
                  totalPages: data.length/10,
                  // actionNode={<button >Add Lead</button>}
                  toggleViewMode: true,
                  hiddenColumns: ["salesManager"],
                  fileName: "Lead_Data",
                  actionMenu: {
                    items: [
                      {
                        label: "Edit",
                        icon: Edit,
                        onClick: () => {
                          console.log("Edited");
                        },
                      },
                      {
                        label: "Delete",
                        icon: Delete,
                        onClick: () => {
                          console.log("Deleted");
                        },
                      },
                    ],
                  },
                }}
              />

              <ComboboxInput
                items={[
                  { label: "Deal", value: "Deal" },
                  { label: "Lead", value: "Lead" },
                ]}
              />
              {imgSrc && <img src={imgSrc} className="w-40 h-40 mt-4" />}

              <Workflow steps={salesPipeline} name="Deal Workflow" />
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
        </div>
      </ProviderWrapper>
      {/* </div> */}
    </>
  );
}

export default App;
