import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../shadcn/ui/sidebar";
import { NavMain } from "./nav-main";
import { useSidebarNav } from "./SidebarNavContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navItems, header, footer, appTitle } = useSidebarNav();
  if (!navItems || navItems.length === 0) {
    return null;
  }

  return (
    <Sidebar className="ml-12" collapsible={"offcanvas"} {...props}>
      <SidebarHeader>
        <h2 className="text-center text-xl my-3 font-bold">
          {appTitle}
        </h2>
        {header && header}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}
