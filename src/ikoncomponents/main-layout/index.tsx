import { type ReactNode } from "react";
import { MainSidebar } from "./main-sidebar";
import { SidebarInset, SidebarProvider } from "../../shadcn/ui/sidebar";
import { DialogProvider } from "../alert-dialog/dialog-context";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { Footer } from "./footer";
import { SidebarNavProvider } from "./SidebarNavContext";
import {
  SidebarExpandedProvider,
  useSidebarExpanded,
  useSidebarExpandedState,
} from "./sidebar-expanded-context";
import { cn } from "../../shadcn/lib/utils";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarExpandedProvider>
      <MainSidebar />
      <MainLayoutBody>{children}</MainLayoutBody>
    </SidebarExpandedProvider>
  );
}

/**
 * The app-sidebar side of the layout. The shadcn SidebarProvider is *controlled*
 * by the rail's expanded state, so the app sidebar's open state is always the
 * inverse of `expanded`. Toggling either the rail or the app sidebar updates the
 * single source of truth (`expanded`) and the other simply follows — no syncing
 * effects, so no feedback loop.
 */
function MainLayoutBody({ children }: { children: ReactNode }) {
  const { expanded, setExpanded } = useSidebarExpandedState();
  return (
    <SidebarProvider open={!expanded} onOpenChange={(open) => setExpanded(!open)}>
      <DialogProvider>
        <SidebarNavProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col h-screen">
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
          </SidebarInset>
        </SidebarNavProvider>
      </DialogProvider>
    </SidebarProvider>
  );
}

/** Page content, shifted right to clear the main sidebar rail (wider when expanded). */
function MainContent({ children }: { children: ReactNode }) {
  const expanded = useSidebarExpanded();
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 pt-0 grow overflow-auto scrollbar-hidden transition-[margin] duration-200 ease-in-out",
        expanded ? "ml-56" : "ml-12"
      )}
    >
      {children}
    </div>
  );
}
