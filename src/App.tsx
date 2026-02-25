import "./styles.css";
import { ProviderWrapper } from "./ikoncomponents/provider-wrapper";
import { setIkonConfig } from "./utils/config";
import { SkeletonWidget } from "./ikoncomponents/skeleton-loader/skeleton-widget";
setIkonConfig({
  IKON_BASE_API_URL: "https://ikoncloud-dev.keross.com/ikon-api",
  IKON_PLATFORM_UI_URL: "/",
  LOGIN_PAGE_URL: "/login.html",
});
function App() {
  return (
    <>
      <ProviderWrapper>hello world</ProviderWrapper>
    </>
  );
}

export default App;
