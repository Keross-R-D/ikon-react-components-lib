# IKON COMPONENT LIBRARY (React)

A comprehensive React component library with UI components, form utilities, data tables, charts, and more. Built with React, TypeScript, Tailwind CSS, and ShadCN UI.

## Installation

```bash
npm i ikoncomponents
```

## Quick Start

### 1. Install Dependencies

Delete your `node_modules` folder and reinstall:

```bash
rm -rf node_modules
npm i
```

### 2. Setup Global Styles

Update your `global.css` or `index.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "ikoncomponents/dist/styles.css";
```

### 3. Configure the Library

In your **entry point** (typically `main.tsx` or `index.tsx`), configure the library **before** rendering:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setIkonConfig } from "ikoncomponents";
import "./global.css";

// Configure BEFORE rendering
setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `IkonConfigProps`

| Property              | Type     | Required | Description                            |
|-----------------------|----------|----------|----------------------------------------|
| `IKON_BASE_API_URL`   | `string` | Yes      | The Ikon API base URL                  |
| `IKON_PLATFORM_UI_URL`| `string` | Yes      | The platform UI base URL               |
| `LOGIN_PAGE_URL`      | `string` | Yes      | URL to redirect to for login           |

### 4. Wrap with ProviderWrapper

In your root `App.tsx`, wrap your application with `<ProviderWrapper>`:

```tsx
import { ProviderWrapper } from "ikoncomponents";

function App() {
  return (
    <ProviderWrapper>
      {/* Your application content */}
    </ProviderWrapper>
  );
}

export default App;
```

> **Important:** `setIkonConfig()` must be called **before** `<ProviderWrapper>` is rendered. Failure to do so will result in configuration not being applied.

---

## Navigation Components

### Sidebar Navigation & Breadcrumbs

Use `RenderSidebarNav` and `RenderAppBreadcrumb` to build a full navigation layout:

```tsx
import { RenderAppBreadcrumb, RenderSidebarNav } from "ikoncomponents";
import { LayoutDashboard, Settings, Users, FileText } from "lucide-react";

function App() {
  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      default: true,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "Profile", url: "/settings/profile" },
        { title: "Account", url: "/settings/account" },
        { title: "Security", url: "/settings/security" },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: FileText,
    },
  ];

  const breadcrumbItem = {
    level: 1,
    title: "Dashboard",
    href: "/dashboard",
  };

  return (
    <>
      <RenderSidebarNav items={navItems} />
      <RenderAppBreadcrumb breadcrumb={breadcrumbItem} />
      <main className="p-8">
        {/* Page content here */}
      </main>
    </>
  );
}
```

#### Navigation Item Structure

```tsx
interface NavItem {
  title: string;              // Display text
  url: string;                // Navigation URL
  icon: LucideIcon;           // Icon component from lucide-react
  default?: boolean;          // Set as default/home
  isActive?: boolean;         // Highlight as active
  items?: NavItem[];          // Submenu items (nested)
}
```

### Refreshing & Updating UI

Use `useRefresh()` hook to refresh the API or trigger sidebar re-render:

```tsx
import { useRefresh } from "ikoncomponents";
import { TextButton } from "ikoncomponents";

function SettingsPage() {
  const { refresh } = useRefresh();

  const handleSave = async () => {
    // Save logic here
    await saveSomeData();

    // Refresh sidebar/API
    refresh();
  };

  return (
    <TextButton onClick={handleSave} variant="default">
      Save Changes
    </TextButton>
  );
}
```

---

## ShadCN Components

All standard ShadCN components are included. Full documentation: [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

| | | | |
|---|---|---|---|
| accordion | alert-dialog | alert | avatar |
| badge | button | calendar | card |
| checkbox | command | date-input | date-range-picker |
| dialog | dropdown-menu | hover-card | input |
| label | navigation-menu | popover | progress |
| radio-group | scroll-area | select | separator |
| sheet | sidebar | skeleton | slider |
| sonner | switch | table | tabs |
| textarea | tooltip | toggle | aspect-ratio |
| breadcrumb | collapsible | drawer | form |
| input-otp | toggle-group | | |

---

## Ikon Components

### ActionMenu

```tsx
import { ActionMenu } from "ikoncomponents";
```

#### Props

| Property            | Type                  | Optional | Description                        |
|---------------------|-----------------------|----------|------------------------------------|
| `actionMenus`       | `ActionMenuProps[]`   | No       | Array of menu items                |
| `extraActionParams` | `ExtraActionParams`   | Yes      | Extra params passed to callbacks   |

#### `ActionMenuProps`

| Property     | Type                                                              | Optional | Description                        |
|-------------|-------------------------------------------------------------------|----------|------------------------------------|
| `items`      | `ActionMenuProps[]`                                               | Yes      | Sub-items for nested menus         |
| `type`       | `"sub" \| "group" \| "separator" \| "label" \| null`             | Yes      | Item type                          |
| `label`      | `((...args: any) => string) \| string`                           | No       | Display label (string or function) |
| `icon`       | `ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>` | Yes | Lucide icon component |
| `disabled`   | `boolean`                                                         | Yes      | Whether the item is disabled       |
| `visibility` | `((...args: any) => boolean) \| boolean`                         | Yes      | Whether the item is visible        |
| `onClick`    | `(...args: any) => void`                                          | Yes      | Click handler                      |

#### `ExtraActionParams`

| Property    | Type    | Optional | Description                        |
|-------------|---------|----------|------------------------------------|
| `arguments` | `any[]` | Yes      | Arguments passed to label/onClick/visibility functions |

---

### AssistantComponent

AI chat assistant powered by `@assistant-ui/react`.

```tsx
import { AssistantComponent } from "ikoncomponents";
```

**Required dependencies:**

```bash
npm install @assistant-ui/react@^0.12.12
npm install @assistant-ui/react-ai-sdk@^1.3.9
npm install @assistant-ui/react-markdown@^0.12.5
```

#### Props

| Property                | Type       | Optional | Default               | Description                             |
|-------------------------|-----------|----------|-----------------------|-----------------------------------------|
| `provider`              | `string`  | Yes      | `"openai"`            | LLM provider (e.g. `"openai"`)         |
| `model`                 | `string`  | Yes      | `"gpt-4o-mini"`       | Model identifier                        |
| `agentId`               | `string`  | Yes      | `"default-agent"`     | Unique agent identifier                 |
| `agentName`             | `string`  | Yes      | `"Default Agent"`     | Display name for the agent              |
| `temperature`           | `number`  | Yes      | `0.7`                 | Controls response randomness (0–2)      |
| `maxTokens`             | `number`  | Yes      | `2048`                | Max response length                     |
| `className`             | `string`  | Yes      |                       | Custom CSS class                        |
| `baseUrl`               | `string`  | Yes      | `"http://localhost:3000"` | API endpoint URL                   |
| `additionalReferenceInfo`| `object` | Yes      | `{}`                  | Extra context/reference info            |
| `appId`                 | `string`  | No       |                       | Application ID for fetching agents      |
| `currentUserDetails`    | `UserData`| No       |                       | Logged-in user metadata                 |

#### `UserData`

| Property        | Type             | Optional |
|-----------------|------------------|----------|
| `userId`        | `string`         | No       |
| `userName`      | `string`         | No       |
| `userLogin`     | `string`         | No       |
| `password`      | `string`         | No       |
| `userPhone`     | `string`         | Yes      |
| `userEmail`     | `string`         | No       |
| `userThumbnail` | `string \| null` | Yes      |
| `userType`      | `string`         | Yes      |
| `active`        | `boolean`        | Yes      |
| `accountId`     | `string`         | Yes      |
| `userDeleted`   | `boolean`        | Yes      |

---

### BigCalendar

```tsx
import { BigCalendar } from "ikoncomponents";
```

#### Props

| Property           | Type                       | Optional | Description                  |
|--------------------|---------------------------|----------|------------------------------|
| `events`           | `BigCalendarEventProps[]`  | No       | Array of calendar events     |
| `extraParamsEvent` | `ExtraParamsEvent`         | Yes      | Extra configuration options  |
| `extraTools`       | `ReactNode[]`              | Yes      | Additional toolbar elements  |
| `onDateClick`      | `(date: Date) => void`     | Yes      | Callback when a date is clicked |

#### `BigCalendarEventProps`

| Property       | Type                       | Optional | Description                     |
|----------------|---------------------------|----------|---------------------------------|
| `title`        | `string`                   | Yes      | Event title                     |
| `isEditable`   | `boolean`                  | Yes      | Whether this event is editable  |
| `isViewable`   | `boolean`                  | Yes      | Whether this event is viewable  |
| `start`        | `Date`                     | No       | Event start datetime            |
| `end`          | `Date`                     | No       | Event end datetime              |
| `onEventClick` | `(event: any) => void`     | Yes      | Click handler for this event    |

#### `ExtraParamsEvent`

| Property           | Type                                      | Optional | Description                          |
|--------------------|------------------------------------------|----------|--------------------------------------|
| `defaultView`      | `string`                                  | Yes      | `"day"`, `"week"`, `"month"`, `"work week"`, `"agenda"` |
| `isEditableAll`    | `boolean`                                 | Yes      | Enable editing for all events        |
| `isViewable`       | `boolean`                                 | Yes      | Enable viewing for all events        |
| `onEditEventClick` | `(event: BigCalendarEventProps) => void`   | Yes      | Callback when an event edit is clicked |
| `onViewEventClick` | `(event: BigCalendarEventProps) => void`   | Yes      | Callback when an event view is clicked |
| `height`           | `string`                                  | Yes      | Calendar container height            |
| `margin`           | `string`                                  | Yes      | Calendar container margin            |

---

### Buttons

```tsx
import {
  TextButton,
  TextButtonWithTooltip,
  IconTextButton,
  IconTextButtonWithTooltip,
  IconButton,
  IconButtonWithTooltip,
} from "ikoncomponents";
```

All button components share a common props interface extending `React.ButtonHTMLAttributes<HTMLButtonElement>`:

| Property   | Type                     | Optional | Description                                 |
|-----------|--------------------------|----------|---------------------------------------------|
| `children` | `React.ReactNode`        | No       | Button content                              |
| `asChild`  | `boolean`                | Yes      | Renders child as slot (defaults to `false`)  |
| `variant`  | `string`                 | Yes      | `"default"`, `"destructive"`, `"outline"`, `"secondary"`, `"ghost"`, `"dashed"`, `"link"` |
| `size`     | `string`                 | Yes      | `"default"`, `"sm"`, `"lg"`, `"icon"`, `"smIcon"`, `"circular"`, `"lgIcon"` |
| `...props` | `ButtonHTMLAttributes`   | Yes      | Any standard HTML button attribute          |

**Tooltip variants** additionally accept:

| Property         | Type                         | Optional | Description              |
|-----------------|------------------------------|----------|--------------------------|
| `tooltipContent` | `string \| React.ReactNode`  | No       | Content shown in tooltip |

---

### ComboboxInput

```tsx
import { ComboboxInput } from "ikoncomponents";
```

#### `ComboBoxInputProps`

| Property       | Type                                     | Optional | Description                 |
|---------------|------------------------------------------|----------|-----------------------------|
| `placeholder` | `string`                                  | Yes      | Placeholder text            |
| `items`       | `ComboboxItemProps[]`                     | No       | Array of selectable items   |
| `onSelect`    | `(value: string \| string[]) => void`    | Yes      | Callback when value changes |
| `disabled`    | `((...args: any) => boolean) \| boolean` | Yes      | Disable the input           |
| `defaultValue`| `string`                                  | Yes      | Default selected value      |

#### `ComboboxItemProps`

| Property   | Type                                     | Optional | Description              |
|-----------|------------------------------------------|----------|--------------------------|
| `value`    | `string`                                  | No       | The item value           |
| `label`    | `string \| undefined`                     | Yes      | Display label            |
| `extra`    | `any`                                     | Yes      | Extra data               |
| `disabled` | `((...args: any) => boolean) \| boolean`  | Yes      | Disable this item        |

---

### MultiCombobox

```tsx
import { MultiCombobox } from "ikoncomponents";
```

#### Props

| Property         | Type                                                                          | Optional | Default | Description                         |
|-----------------|-------------------------------------------------------------------------------|----------|---------|-------------------------------------|
| `placeholder`   | `string`                                                                       | No       |         | Placeholder text                    |
| `items`         | `{ value: string; label?: string; disabled?: boolean \| ((item: any) => boolean) }[]` | No |   | Selectable items                    |
| `onValueChange` | `(selectedItems: string[]) => void`                                            | No       |         | Callback with selected values array |
| `defaultValue`  | `string[]`                                                                     | Yes      |         | Default selected values             |
| `defaultOptions`| `number`                                                                       | Yes      | `2`     | Number of visible chips before "+N" |

---

### CustomAlertDialog

```tsx
import { CustomAlertDialog } from "ikoncomponents";
```

#### Props

| Property         | Type         | Optional | Description                              |
|-----------------|-------------|----------|------------------------------------------|
| `title`          | `string`    | No       | Dialog title                             |
| `description`    | `string`    | Yes      | Dialog description                       |
| `fontSize`       | `string`    | Yes      | Tailwind font size class (e.g. `"text-sm"`) |
| `cancelText`     | `string`    | Yes      | Custom cancel button text                |
| `confirmText`    | `string`    | Yes      | Custom confirm button text               |
| `thirdOptionText`| `string`    | Yes      | Custom third button text                 |
| `onCancel`       | `() => void`| Yes      | Cancel callback                          |
| `onConfirm`      | `() => void`| Yes      | Confirm callback                         |
| `onThird`        | `() => void`| Yes      | Third button callback                    |

---

### DataTable\<TData, TValue\>

A fully-featured data table with sorting, filtering, pagination, grouping, and column customization.

```tsx
import { DataTable } from "ikoncomponents";
import { ColumnDef } from "@tanstack/react-table";
```

#### Complete DataTable Example

```tsx
import { useState } from "react";
import { DataTable } from "ikoncomponents";
import type { DTExtraParamsProps } from "ikoncomponents";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

function UsersTable() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "inactive" },
  ]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      title: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      title: "Full Name",
      headerClassName: "text-left",
    },
    {
      accessorKey: "email",
      header: "Email",
      title: "Email Address",
    },
    {
      accessorKey: "role",
      header: "Role",
      title: "User Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span className={info.getValue() === "active" ? "text-green-600" : "text-red-600"}>
          {info.getValue() as string}
        </span>
      ),
    },
  ];

  const extraParams: DTExtraParamsProps = {
    sorting: true,
    paginationBar: true,
    rowsPerPage: true,
    pagination: true,
    pageSize: 10,
    pageSizeArray: [5, 10, 25, 50],
    defaultTools: ["search", "filter", "columnFilter"],
    checkBoxColumn: true,
    checkBoxColumnCallback: (selectedRows) => {
      console.log("Selected rows:", selectedRows);
    },
  };

  return (
    <div className="w-full">
      <DataTable
        data={users}
        columns={columns}
        extraParams={extraParams}
        onTableReady={(table) => {
          console.log("Table initialized:", table);
        }}
      />
    </div>
  );
}

export default UsersTable;
```

#### Props

| Property       | Type                                  | Optional | Description                       |
|---------------|---------------------------------------|----------|-----------------------------------|
| `data`         | `TData[]`                             | No       | Array of row data                 |
| `columns`      | `DTColumnsProps<TData, TValue>[]`     | No       | Column definitions                |
| `extraParams`  | `DTExtraParamsProps`                   | Yes      | Table configuration               |
| `onTableReady` | `(table: any) => void`               | Yes      | Callback when table initializes   |

#### `DTColumnsProps<TData, TValue>`

Extends TanStack Table's `ColumnDef<TData, TValue>`.

| Property          | Type     | Optional | Description                    |
|-------------------|---------|----------|--------------------------------|
| `title`           | `string` | Yes      | Column title for display       |
| `headerClassName` | `string` | Yes      | CSS class for the header cell  |

#### `DTExtraParamsProps`

| Property                | Type                                               | Optional | Description                               |
|------------------------|-----------------------------------------------------|----------|-------------------------------------------|
| `defaultGroups`        | `string[]`                                           | Yes      | Default column groupings                  |
| `grouping`             | `boolean`                                            | Yes      | Enable row grouping                       |
| `header`               | `boolean`                                            | Yes      | Show table header                         |
| `footer`               | `boolean`                                            | Yes      | Show table footer                         |
| `defaultTools`         | `("columnFilter" \| "search" \| "filter")[] \| boolean` | Yes   | Toolbar tools to show                     |
| `extraTools`           | `any`                                                | Yes      | Additional toolbar elements               |
| `sorting`              | `boolean`                                            | Yes      | Enable sorting                            |
| `paginationBar`        | `boolean`                                            | Yes      | Show pagination bar                       |
| `rowsPerPage`          | `boolean`                                            | Yes      | Show rows-per-page selector               |
| `pagination`           | `boolean`                                            | Yes      | Enable pagination                         |
| `numberOfRows`         | `boolean`                                            | Yes      | Show row count                            |
| `checkBoxColumn`       | `boolean`                                            | Yes      | Show checkbox column                      |
| `checkBoxColumnCallback`| `(selectedRows: any[]) => void`                     | Yes      | Callback for selected rows                |
| `actionMenu`           | `DTActionMenuProps`                                  | Yes      | Row-level action menu                     |
| `groupActionMenu`      | `DTActionMenuProps`                                  | Yes      | Group-level action menu                   |
| `pageSize`             | `number`                                             | Yes      | Initial page size                         |
| `pageIndex`            | `number`                                             | Yes      | Initial page index                        |
| `pageSizeArray`        | `number[]`                                           | Yes      | Available page size options               |
| `rowSelection`         | `boolean`                                            | Yes      | Enable row selection                      |
| `onPaginationChange`   | `(state: PaginationState) => void`                   | Yes      | Pagination state change callback          |
| `defaultRowSelection`  | `(row: any) => boolean`                              | Yes      | Function to determine default selected rows |

#### `DTActionMenuProps`

| Property         | Type               | Optional | Description                |
|------------------|--------------------|----------|----------------------------|
| `items`          | `ActionMenuProps[]` | No       | Action menu items          |
| `extraArguments` | `any[]`             | Yes      | Extra args passed to items |

---

### EChart

```tsx
import { EChart } from "ikoncomponents";
```

Uses `forwardRef` — you can access `ref` methods.

#### Props

| Property         | Type                            | Optional | Default     | Description                      |
|------------------|---------------------------------|----------|-------------|----------------------------------|
| `parentDivProps` | `any`                           | Yes      | `{}`        | Props for container div          |
| `option`         | `Record<string \| number, any>` | Yes      | `{}`        | ECharts option object            |
| `style`          | `Record<string, string>`        | Yes      | `{}`        | CSS styles for chart container   |
| `settings`       | `Record<string, any>`           | Yes      | `{}`        | ECharts `setOption` settings     |
| `loading`        | `boolean`                       | Yes      | `true`      | Show loading state               |
| `theme`          | `string \| object \| null`      | Yes      | `undefined` | ECharts theme                    |
| `isConfigurable` | `boolean`                       | Yes      | `false`     | Show configure toolbox button    |
| `resizeKey`      | `null \| boolean \| number \| string` | Yes | `undefined` | Key to trigger chart resize |
| `onClick`        | `(...args: any) => void`        | Yes      | `() => {}`  | Click event callback             |
| `onConfigure`    | `(...args: any) => void`        | Yes      | `() => {}`  | Configure button callback        |

#### Ref Methods

| Method                    | Description                                    |
|---------------------------|------------------------------------------------|
| `getChartObject()`        | Returns the ECharts instance                   |
| `setOption(option, settings)` | Sets chart option                          |
| `resize(secondResizeDelay?)` | Resizes the chart                            |
| `loadingVisible(visibility?)` | Show/hide loading spinner                   |
| `dispose()`               | Disposes the chart instance                    |
| `on(eventName, callback)` | Adds an event listener                         |

---

### FileUploader

```tsx
import { FileUploader, getImageFromObject } from "ikoncomponents";
```

#### `FileUploaderProps`

| Property       | Type                                               | Optional | Default          | Description                           |
|---------------|-----------------------------------------------------|----------|------------------|---------------------------------------|
| `label`        | `string`                                            | Yes      | `"Upload File"`  | Label text                            |
| `isDrag`       | `boolean`                                           | Yes      | `false`          | Enable drag & drop upload             |
| `onFileSelect` | `(fileObj: FileObjType) => Promise<FileObjType> \| void` | No  |              | Callback with the processed file      |

#### `FileObjType`

| Property        | Type      | Description                  |
|----------------|-----------|------------------------------|
| `message`      | `string`  | Status message               |
| `fileName`     | `string`  | Original file name           |
| `size`         | `number`  | File size in bytes           |
| `type`         | `string`  | MIME type                    |
| `lastModified` | `number`  | Last modified timestamp      |
| `base64`       | `string`  | Base64-encoded file content  |

#### Usage

```tsx
// Simple upload
<FileUploader onFileSelect={(fileObj) => console.log(fileObj)} />

// Drag & drop upload
<FileUploader isDrag={true} onFileSelect={handleFileUpload} />

// Display uploaded image
const [imgSrc, setImgSrc] = useState<string | null>(null);

const handleFileUpload = async (fileObj: FileObjType) => {
  const imgUrl = getImageFromObject(fileObj);
  setImgSrc(imgUrl);
};

<FileUploader onFileSelect={handleFileUpload} />
{imgSrc && <img src={imgSrc} className="w-40 h-40 mt-4" />}
```

---

### GlowingEffect

```tsx
import { GlowingEffect } from "ikoncomponents";
```

#### Props

| Property           | Type                     | Optional | Default      | Description                    |
|--------------------|--------------------------|----------|--------------|--------------------------------|
| `blur`             | `number`                 | Yes      | `0`          | Blur radius                    |
| `inactiveZone`     | `number`                 | Yes      | `0.7`        | Inner zone where glow is inactive |
| `proximity`        | `number`                 | Yes      | `0`          | Activation proximity distance  |
| `spread`           | `number`                 | Yes      | `20`         | Gradient spread angle          |
| `variant`          | `"default" \| "white"`   | Yes      | `"default"`  | Color variant                  |
| `glow`             | `boolean`                | Yes      | `false`      | Enable glow effect             |
| `className`        | `string`                 | Yes      |              | Custom CSS class               |
| `disabled`         | `boolean`                | Yes      | `true`       | Disable the effect             |
| `movementDuration` | `number`                 | Yes      | `2`          | Animation duration (seconds)   |
| `borderWidth`      | `number`                 | Yes      | `1`          | Border width (px)              |

---

### Icon

```tsx
import { Icon } from "ikoncomponents";
```

Dynamically renders any [Lucide icon](https://lucide.dev/icons) by name.

#### Props

| Property      | Type               | Optional | Description              |
|--------------|---------------------|----------|--------------------------|
| `name`        | `string`           | No       | Lucide icon name         |
| `size`        | `number \| string` | Yes      | Icon size                |
| `color`       | `string`           | Yes      | Icon color               |
| `className`   | `string`           | Yes      | CSS class                |
| `strokeWidth` | `number`           | Yes      | Stroke width             |

---

### LoadingSpinner

```tsx
import { LoadingSpinner } from "ikoncomponents";
```

#### Props

| Property    | Type                 | Optional | Default | Description              |
|------------|----------------------|----------|---------|--------------------------|
| `size`      | `number`            | Yes      | `48`    | Spinner size (px)        |
| `className` | `string`            | Yes      |         | CSS class                |
| `visible`   | `boolean`           | Yes      | `true`  | Whether to show spinner  |
| `...props`  | `React.SVGProps`    | Yes      |         | Additional SVG props     |

---

### NoDataComponent

```tsx
import { NoDataComponent } from "ikoncomponents";
```

#### Props

| Property | Type     | Optional | Default              | Description           |
|---------|---------|----------|----------------------|-----------------------|
| `text`   | `string` | Yes      | `"No Data Available"` | Message to display    |

---

### PageWrapper

```tsx
import { PageWrapper } from "ikoncomponents";
```

#### Props

| Property   | Type                      | Optional | Description                  |
|-----------|---------------------------|----------|------------------------------|
| `title`    | `string \| ReactNode`     | Yes      | Page title                   |
| `subtitle` | `string \| ReactNode`     | Yes      | Page subtitle                |
| `tools`    | `ReactNode`               | Yes      | Action buttons / tools area  |
| `children` | `ReactNode`               | No       | Page content                 |

---

### PasswordStrengthMeter

```tsx
import { PasswordStrengthMeter } from "ikoncomponents";
```

#### Props

| Property | Type     | Optional | Description                                    |
|---------|---------|----------|------------------------------------------------|
| `value`  | `string` | No       | The password string to evaluate strength for   |

Displays a color-coded progress bar: Very weak → Weak → Fair → Good → Strong.

---

### SimpleWidget

```tsx
import { SimpleWidget } from "ikoncomponents";
```

#### Props

| Property         | Type                              | Optional | Default | Description                      |
|-----------------|-----------------------------------|----------|---------|----------------------------------|
| `title`          | `string`                         | No       |         | Widget title                     |
| `iconName`       | `string`                         | Yes      |         | Lucide icon name                 |
| `iconSize`       | `number`                         | Yes      | `20`    | Icon size                        |
| `iconClass`      | `string`                         | Yes      | `""`    | Icon CSS class                   |
| `primaryText`    | `number \| string \| ReactNode`  | No       |         | Main display value               |
| `secondaryText`  | `string \| ReactNode`            | Yes      |         | Secondary text                   |
| `mainClassName`  | `string`                         | Yes      | `""`    | Container CSS class              |
| `loading`        | `boolean`                        | Yes      |         | Show loading state               |
| `loadingMessage` | `string`                         | Yes      | `"Loading..."` | Loading state text        |

---

### Tabs (CustomTabs)

```tsx
import { CustomTabs } from "ikoncomponents";
```

#### Props

| Property             | Type                        | Optional | Default | Description                    |
|---------------------|-----------------------------|----------|---------|--------------------------------|
| `children`           | `ReactNode`                | Yes      |         | Content for the active tab     |
| `tabArray`           | `TabArray[]`               | No       |         | Array of tab definitions       |
| `tabListClass`       | `string`                   | Yes      | `""`    | CSS class for tab list         |
| `tabListInnerClass`  | `string`                   | Yes      | `""`    | CSS class for inner tab list   |
| `tabListButtonClass` | `string`                   | Yes      | `""`    | CSS class for tab buttons      |
| `tabContentClass`    | `string`                   | Yes      | `""`    | CSS class for tab content      |
| `pathName`           | `string`                   | Yes      |         | Current pathname (for routing) |
| `headerEndComponent` | `React.ReactNode`          | Yes      |         | Component at end of tab header |
| `onTabChange`        | `(tabId: string) => void`  | Yes      |         | Tab change callback            |
| `isSeperatePage`     | `boolean`                  | Yes      | `false` | Tabs mapped to separate pages  |

#### `TabArray`

| Property     | Type               | Optional | Description                   |
|-------------|---------------------|----------|-------------------------------|
| `tabName`    | `string`           | No       | Display name of the tab       |
| `tabId`      | `string`           | No       | Unique identifier             |
| `default`    | `boolean`          | No       | Whether this tab is default   |
| `tabContent` | `React.ReactNode`  | Yes      | Content rendered for this tab |
| `url`        | `string`           | Yes      | URL for page-based tabs       |

---

### TitleProgress

```tsx
import { TitleProgress } from "ikoncomponents";
```

#### Props

| Property            | Type      | Optional | Default | Description                       |
|--------------------|-----------|----------|---------|-----------------------------------|
| `title`             | `string`  | No       |         | Progress title                    |
| `value`             | `number`  | No       |         | Progress value (0–100)            |
| `valueText`         | `string`  | Yes      |         | Custom value text                 |
| `isPercent`         | `boolean` | Yes      | `true`  | Append `%` to value               |
| `className`         | `string`  | Yes      |         | Container CSS class               |
| `titleClassName`    | `string`  | Yes      |         | Title CSS class                   |
| `valueClassName`    | `string`  | Yes      |         | Value CSS class                   |
| `progressClassName` | `string`  | Yes      |         | Progress bar CSS class            |

---

### TooltipComponent

```tsx
import { TooltipComponent } from "ikoncomponents";
```

#### Props

| Property         | Type                        | Optional | Description                |
|-----------------|-----------------------------|----------|----------------------------|
| `tooltipContent` | `string \| ReactNode`       | No       | Content shown in tooltip   |
| `children`       | `ReactNode`                 | No       | Element that triggers tooltip |

---

### Widgets

```tsx
import { Widgets } from "ikoncomponents";
```

#### Props

| Property     | Type            | Optional | Description              |
|-------------|-----------------|----------|--------------------------|
| `widgetData` | `WidgetProps[]` | No       | Array of widget items    |

#### `WidgetProps`

| Property             | Type                                                          | Optional | Description                        |
|---------------------|-----------------------------------------------------------------|----------|------------------------------------|
| `id`                 | `string`                                                      | No       | Unique widget identifier           |
| `widgetText`         | `string`                                                      | No       | Widget title text                  |
| `widgetNumber`       | `string`                                                      | No       | Displayed numeric value            |
| `iconName`           | `string`                                                      | Yes      | Lucide icon name                   |
| `onButtonClickfunc`  | `(...params: (string \| Record<string, string>)[]) => void`  | Yes      | Click handler                      |

---

### Skeleton Loaders

#### GradeTableLoader

```tsx
import { GradeTableLoader } from "ikoncomponents";
```

| Property      | Type      | Optional | Default | Description                 |
|--------------|-----------|----------|---------|-----------------------------|
| `rowCount`    | `number`  | Yes      | `6`     | Number of skeleton rows     |
| `showToolbar` | `boolean` | Yes      | `true`  | Show skeleton toolbar       |

#### SkeletonWidget

```tsx
import { SkeletonWidget } from "ikoncomponents";
```

| Property | Type     | Optional | Description                       |
|---------|---------|----------|-----------------------------------|
| `count`  | `number` | No       | Number of skeleton widget cards   |

---

### SheetComponent

```tsx
import { SheetComponent } from "ikoncomponents";
```

#### Props

| Property           | Type               | Optional | Description                  |
|-------------------|--------------------|----------|------------------------------|
| `buttonText`       | `React.ReactNode`  | Yes      | Text on trigger button       |
| `buttonIcon`       | `React.ReactNode`  | Yes      | Icon on trigger button       |
| `buttonStyle`      | `string`           | Yes      | Trigger button CSS class     |
| `sheetTitle`       | `React.ReactNode`  | Yes      | Sheet title                  |
| `sheetDescription` | `React.ReactNode`  | Yes      | Sheet description            |
| `sheetContent`     | `React.ReactNode`  | Yes      | Sheet body content           |
| `closeButton`      | `boolean`          | Yes      | Show close button            |

---

## Form Components

All form components are designed to work with **react-hook-form** and integrate seamlessly with `<Form>` from ShadCN. They provide automatic validation, error handling, and consistent styling.

### Complete Form Example

Here's a full example using multiple form components:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormInput,
  FormPasswordInput,
  FormDateInput,
  FormComboboxInput,
  FormTextarea,
  TextButton,
} from "ikoncomponents";

const registrationSchema = z.object({
  username: z.string().min(3, "Username must be 3+ chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ chars"),
  dateOfBirth: z.date(),
  country: z.string().min(1, "Select a country"),
  bio: z.string().optional(),
});

function RegisterForm() {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    // Send to API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          formControl={form.control}
          name="username"
          label="Username"
          placeholder="Choose a username"
          formDescription="3+ characters"
        />

        <FormInput
          formControl={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
        />

        <FormPasswordInput
          formControl={form.control}
          name="password"
          label="Password"
          placeholder="Create a strong password"
          formDescription="8+ characters with uppercase and numbers"
        />

        <FormDateInput
          formControl={form.control}
          name="dateOfBirth"
          label="Date of Birth"
        />

        <FormComboboxInput
          formControl={form.control}
          name="country"
          label="Country"
          placeholder="Select country"
          items={[
            { value: "US", label: "United States" },
            { value: "UK", label: "United Kingdom" },
            { value: "CA", label: "Canada" },
          ]}
        />

        <FormTextarea
          formControl={form.control}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself"
        />

        <TextButton type="submit" variant="default">
          Create Account
        </TextButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
```

### FormInput

Standard text input field with validation.

```tsx
import { FormInput } from "ikoncomponents";
```

#### Props

| Property              | Type                               | Optional | Description                        |
|----------------------|------------------------------------|----------|------------------------------------|
| `formControl`         | `Control<any>`                     | No       | `form.control` from react-hook-form |
| `name`                | `string`                           | No       | Field name                         |
| `label`               | `string`                           | Yes      | Label text                         |
| `placeholder`         | `string`                           | Yes      | Placeholder text                   |
| `formDescription`     | `string`                           | Yes      | Help text below field              |
| `formItemClass`       | `string`                           | Yes      | CSS class for container            |
| `extraFormComponent`  | `(value: string) => ReactNode`     | Yes      | Custom component with field value  |
| `...inputProps`       | `InputHTMLAttributes`              | Yes      | HTML input attributes (type, disabled, min, max, etc.) |

### FormPasswordInput

```tsx
import { FormPasswordInput } from "ikoncomponents";
```

Same props as `FormInput`. Renders a password field with a show/hide toggle button.

### FormTextarea

```tsx
import { FormTextarea } from "ikoncomponents";
```

#### Props

Extends `FormFieldProps` + `TextareaHTMLAttributes<HTMLTextAreaElement>`.

| Property              | Type                               | Optional | Description                        |
|----------------------|------------------------------------|----------|------------------------------------|
| `formControl`         | `any`                              | No       | `form.control` from react-hook-form |
| `name`                | `string`                           | No       | Field name                         |
| `label`               | `string`                           | Yes      | Label text                         |
| `formDescription`     | `string`                           | Yes      | Help text below field              |
| `formItemClass`       | `string`                           | Yes      | CSS for form item wrapper          |
| `extraFormComponent`  | `(value: string) => ReactNode`     | Yes      | Extra component rendered with value |
| `...textAreaProps`    | `TextareaHTMLAttributes`           | Yes      | Standard HTML textarea attributes  |

### FormDateInput

```tsx
import { FormDateInput } from "ikoncomponents";
```

#### Props

| Property                | Type       | Optional | Description                               |
|------------------------|-----------|----------|-------------------------------------------|
| `formControl`           | `any`     | No       | `form.control` from react-hook-form        |
| `name`                  | `string`  | No       | Field name                                |
| `label`                 | `string`  | Yes      | Label text                                |
| `placeholder`           | `string`  | Yes      | Placeholder text                          |
| `dateFormat`            | `string`  | Yes      | Date display format (default: `"PPP"`)    |
| `calendarDateDisabled`  | `Matcher` | Yes      | Disable certain dates (react-day-picker)  |
| `formDescription`       | `string`  | Yes      | Help text below field                     |
| `disabled`              | `boolean` | Yes      | Disable the input                         |

### FormComboboxInput

```tsx
import { FormComboboxInput } from "ikoncomponents";
```

#### Props

| Property              | Type                                     | Optional | Description                        |
|----------------------|------------------------------------------|----------|------------------------------------|
| `formControl`         | `any`                                    | No       | `form.control` from react-hook-form |
| `name`                | `string`                                 | No       | Field name                         |
| `label`               | `string`                                 | Yes      | Label text                         |
| `placeholder`         | `string`                                 | Yes      | Placeholder text                   |
| `formDescription`     | `string`                                 | Yes      | Help text below field              |
| `items`               | `FormComboboxItemProps[]`               | No       | Selectable items                   |
| `disabled`            | `((...args: any) => boolean) \| boolean` | Yes      | Disable the input                  |
| `onSelect`            | `(value: string \| string[]) => void`    | Yes      | Selection callback                 |
| `defaultValue`        | `[]`                                     | Yes      | Default selected value             |

### FormComboboxInputWithValue

```tsx
import { FormComboboxInputWithValue } from "ikoncomponents";
```

A controlled variant of `FormComboboxInput` that accepts external `value` and `onChange`.

#### Props

| Property              | Type                                                          | Optional | Description                        |
|----------------------|---------------------------------------------------------------|----------|------------------------------------|
| `formControl`         | `Control<any>`                                                | No       | `form.control` from react-hook-form |
| `name`                | `string`                                                     | No       | Field name                         |
| `label`               | `string`                                                     | Yes      | Label text                         |
| `placeholder`         | `string`                                                     | Yes      | Placeholder text                   |
| `formDescription`     | `string`                                                     | Yes      | Help text                          |
| `items`               | `{ value: string; label: string; disabled?: boolean \| ((item: any) => boolean) }[]` | No | Items |
| `disabled`            | `boolean \| ((...args: any[]) => boolean)`                   | Yes      | Disable the input                  |
| `onSelect`            | `(value: any) => void`                                        | Yes      | Selection callback                 |
| `value`               | `string`                                                     | Yes      | Controlled value                   |
| `onChange`             | `(value: any) => void`                                        | Yes      | Controlled change handler          |

### FormMultiComboboxInput

```tsx
import { FormMultiComboboxInput } from "ikoncomponents";
```

#### Props

| Property              | Type                                     | Optional | Default | Description                        |
|----------------------|------------------------------------------|----------|---------|------------------------------------|
| `formControl`         | `any`                                    | No       |         | `form.control` from react-hook-form |
| `name`                | `string`                                 | No       |         | Field name                         |
| `label`               | `string`                                 | Yes      |         | Label text                         |
| `placeholder`         | `string`                                 | Yes      |         | Placeholder text                   |
| `formDescription`     | `string`                                 | Yes      |         | Help text                          |
| `items`               | `FormComboboxItemProps[]`               | Yes      | `[]`    | Selectable items                   |
| `disabled`            | `((...args: any) => boolean) \| boolean` | Yes      |         | Disable the input                  |
| `onSelect`            | `(value: string \| string[]) => void`    | Yes      |         | Selection callback                 |
| `defaultValue`        | `any[]`                                  | Yes      | `[]`    | Default selected values            |
| `defaultOptions`      | `number`                                 | Yes      | `2`     | Visible chips before "+N"          |

### FormOtpInput

```tsx
import { FormOtpInput } from "ikoncomponents";
```

Same props as `FormInput`. Renders a 4-digit OTP input.

---

## ImageCropperProvider

```tsx
import { ImageCropperProvider, useImageCropper } from "ikoncomponents";
```

Provides an image cropper context and modal for cropping images into landscape, portrait, and icon aspect ratios.

#### `ImageCropperProps`

| Property            | Type                                                                                     | Optional | Description                             |
|--------------------|------------------------------------------------------------------------------------------|----------|-----------------------------------------|
| `children`          | `ReactNode`                                                                              | No       | Wrapped content                         |
| `uploadedImages`    | `CropperUploadImagesInfoProps \| null`                                                   | No       | Pre-uploaded images to initialize with  |
| `onCropperChange`   | `(originalImage: OriginalImageProps, aspectRatioWiseImages: AspectRatioWiseImagesProps) => void` | No | Callback with cropped results     |
| `modalOpen`         | `boolean`                                                                                | Yes      | Control modal visibility                |
| `onModalOpenChange` | `(open: boolean) => void`                                                               | Yes      | Modal open state change callback        |

#### `useImageCropper()` Hook

Returns:

| Property                  | Type                                                      | Description                    |
|--------------------------|-----------------------------------------------------------|--------------------------------|
| `originalImage`           | `OriginalImageProps`                                      | Current original image state   |
| `setOriginalImage`        | `(img: OriginalImageProps) => void`                       | Set original image             |
| `aspectRatioWiseImages`   | `AspectRatioWiseImagesProps`                              | Cropped images per ratio       |
| `setAspectRatioWiseImages`| `(imgs: AspectRatioWiseImagesProps) => void`              | Set cropped images             |

---

## ThemeToggleBtn

```tsx
import { ThemeToggleBtn } from "ikoncomponents";
```

Renders a theme toggle button (light/dark/system). No props required.

---

## WorkInProgress

```tsx
import { WorkInProgress } from "ikoncomponents";
```

Renders a "Work In Progress" placeholder. No props required.

