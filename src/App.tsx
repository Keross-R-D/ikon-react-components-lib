import "./styles.css";
import { useState } from "react";
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
        <EChart />
        <FileUploader onFileSelect={(args) => console.log(args)} />
        <Form {...form}>
          <form className="space-y-4">
            <FormInput
              name="name"
              formControl={form.control}
              placeholder="Enter a workflow name"
              label="Workflow Name"
            />
            <FormComboboxInput
              formControl={form.control}
              name="Test Dropdown"
              items={[
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
              ]}
              placeholder="Select an option"
            />
            <FormDateInput name="startDate" formControl={form.control} />
            <FormOtpInput name="otp" formControl={form.control} />
            <FormPasswordInput name="password" formControl={form.control} />
            <FormTextarea
              name="textarea"
              formControl={form.control}
              placeholder="Enter description..."
            />
          </form>
        </Form>
        <GlowingEffect />
        {/* <ImageCropper src={undefined} onCroppedImage={function (imageUrl: string): void {
          throw new Error("Function not implemented.");
        } } aspectRatio={0} rotationAngle={0} zoomLevel={0} moveDirection={{
          x: 0,
          y: 0
        }} /> */}
        {/* <LoadingSpinner /> */}
          <AssistantComponent className="h-2/3" appId="9f3a7c2e-5b41-4d8a-9c6e-1a72f8e3b4c9" currentUserDetails={userData} baseUrl="http://localhost:3001"/>
          {/* </div> */}
        <UploadTab />
      </ProviderWrapper>
    </>

  );
}

export default App;
