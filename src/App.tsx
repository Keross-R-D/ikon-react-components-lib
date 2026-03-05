import "./styles.css";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { UploadTab } from "./ikoncomponents/upload-tab";
import type { DTExtraParamsProps } from "./ikoncomponents/data-table/type";
import { EChart } from "./ikoncomponents/e-chart";
import { FileUploader } from "./ikoncomponents/fileUpload";
import { FormComboboxInput } from "./ikoncomponents/form-fields/combobox-input";
import { Form } from "./shadcn/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./ikoncomponents/form-fields/input";
import { FormDateInput } from "./ikoncomponents/form-fields/date-input";
import { FormOtpInput } from "./ikoncomponents/form-fields/otp-input";
import { FormPasswordInput } from "./ikoncomponents/form-fields/password-input";
import { FormTextarea } from "./ikoncomponents/form-fields/textarea";
import { GlowingEffect } from "./ikoncomponents/glowing-effect";
import { AssistantComponent } from "./ikoncomponents/assistant-ui/Assistant";

setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

const workflowSchema = z.object({                                                                                                                           
  // name: z.string().min(1, "Name is required"),
  // version: z.number().int(),
  // isDeployed: z.boolean(),
  // celeryData: z.object({}),
  // data: z.object({}),
  // status: z.string(),
  name: z.string().min(1, "Name is required"),
  version: z.number().int(),
  isDeployed: z.boolean(),
  celeryData: z.object({}),
  data: z.object({
    nodes: z.array(z.any()), // Replace z.any() with your WorkflowNode schema if available
    edges: z.array(z.any()), // Replace z.any() with your WorkflowEdge schema if available
  }),
  status: z.string(),
});

function App() {
  const dummyData = [
    { id: 1, name: "John Doe", age: 28, email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
    {
      id: 3,
      name: "Alice Johnson",
      age: 25,
      email: "alice.johnson@example.com",
    },
  ];

  const dummyColumns = [
    {
      accessorKey: "id",
      header: "ID",
      title: "ID",
      headerClassName: "text-center",
    },
    {
      accessorKey: "name",
      header: "Name",
      title: "Full Name",
      headerClassName: "text-left",
    },
    {
      accessorKey: "age",
      header: "Age",
      title: "Age",
      headerClassName: "text-right",
    },
    {
      accessorKey: "email",
      header: "Email",
      title: "Email Address",
      headerClassName: "text-left",
    },
  ];

  const extraParams: DTExtraParamsProps = {
    grouping: false,
    pageSize: 5,
    pageSizeArray: [5, 10, 15, 20, 25, 50, 75, 100],
  };

  const form = useForm<z.infer<typeof workflowSchema>>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      version: 1,
      isDeployed: true,
      celeryData: {},
      data: {},
      status: "active",
    },
  });

    const userData = {
    userId: "u-98234",
    userName: "Alex Rivera",
    userLogin: "arivera_dev",
    password: "hashed_password_123",
    userPhone: "+1-555-010-9988",
    userEmail: "alex.rivera@example.com",
    userThumbnail: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    userType: "Admin",
    active: true,
    accountId: "acc-4402",
    userDeleted: false,
  };

  return (
    <>
      <ProviderWrapper>
       
      </ProviderWrapper>
    </>

  );
}

export default App;
