import "./styles.css";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { SheetComponent } from "./ikoncomponents/sheet";
import { NoDataComponent } from "./ikoncomponents/no-data";
import { ActivitySheet } from "./ikoncomponents/activity-sheet";
import { CustomTabs } from "./ikoncomponents/tabs";
import { UploadTab } from "./ikoncomponents/upload-tab";
setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});
function App() {
  return (
    <>
      <ProviderWrapper>
        <UploadTab />
      </ProviderWrapper>
    </>
  );
}

export default App;
