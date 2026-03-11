import React from "react";
import { ThemeProvider } from "../../utils/theme-provider";
import { FontProvider } from "../../utils/font-provider";
import { RadiusProvider } from "../../utils/border-radius-provider";
import { BreadcrumbProvider } from "../app-breadcrumb/BreadcrumbProvider";
import { MainLayout } from "../main-layout";
import { RefreshProvider } from "../main-layout/RefreshContext";
import { BrowserRouter, Outlet } from "react-router";
import { TanstackProvider } from "./TanstackProvider";
import { UserProvider } from "../../utils/userContext";
import { getConfig } from "../../utils/config";

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  const config = getConfig();
  if (
    !config.IKON_BASE_API_URL ||
    !config.IKON_PLATFORM_UI_URL ||
    !config.LOGIN_PAGE_URL
  ) {
    throw new Error(
      "[IKON] ProviderWrapper: Ikon config not set. Please call setIkonConfig() before rendering ProviderWrapper.",
    );
  }
  return (
    <TanstackProvider>
      <UserProvider>
        <ThemeProvider>
          {/*attribute="class" defaultTheme="system" enableSystem*/}
          <FontProvider>
            <RadiusProvider>
              <BreadcrumbProvider>
                <RefreshProvider>
                  <BrowserRouter>
                    <MainLayout>
                      <Outlet />
                      {children}
                    </MainLayout>
                  </BrowserRouter>
                </RefreshProvider>
              </BreadcrumbProvider>
            </RadiusProvider>
          </FontProvider>
        </ThemeProvider>
      </UserProvider>
    </TanstackProvider>
  );
}
