import {
  ExternalLink,
  LoaderPinwheel,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import { Button } from "../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip";
import { Link } from "react-router";
import { cn } from "../../shadcn/lib/utils";
import { getConfig } from "../../utils/config";
import UserAvatar from "./userAvatar";
import Accounts from "./accounts";
import SoftwareList from "./software-list";
import { useSidebarExpandedState } from "./sidebar-expanded-context";
import { useUser } from "@/utils/userContext";

export interface AccountMembership {
  accountId: string;
  accountName: string;
  primaryAccount?: boolean; // optional if not always present
}

export interface Account {
  accountId: string;
  accountName: string;
  accountConfiguration: any | null;
  accountDeleted: boolean;
  active: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

export interface Software {
  softwareId: string;
  softwareName: string;
  url: string;
  icon: string;
  visible: boolean;
  defaultSoftware: boolean;
  order: number;
}

export interface User {
  userId: string;
  userName: string;
  userLogin: string;
  userPhone: string;
  userEmail: string;
  userType: string;
  active: boolean;
  dateOfBirth: string;
  userProfileImage: string;
  userDescription: string;
  userDesignation: string;
  userDeleted: boolean;
}

export interface DecodedAccessToken {
  iss: string;
  jti: string;
  aud: string;
  sub: string;
  typ: string;
  sid: string;
  platformAccess: {
    roles: string[];
  };
  primaryAccountId: string;
  activeAccountId: string;
  userType: string;
  scope: string;
  iat: number;
  exp: number;
}

export const MainSidebar = ({
  releaseOpsUrl = "https://ikon-dev.keross.com/developer/devtools",
}: {
  /** Destination for the Release Ops. button. Defaults to the dev devtools URL. */
  releaseOpsUrl?: string;
} = {}) => {
  const { IKON_PLATFORM_UI_URL } = getConfig();
  const { expanded, toggle } = useSidebarExpandedState();
  const { user } = useUser();
  
  return (
      <TooltipProvider delayDuration={0}>
        <aside
          className={cn(
            "fixed left-0 top-0 z-20 h-screen border-r border-border bg-sidebar text-sidebar-foreground flex flex-col py-4 transition-[width] duration-200 ease-in-out",
            expanded ? "w-56 items-stretch px-2" : "w-12 items-center"
          )}
        >
          

          {/* Account */}
          <Accounts />

          {/* Softwares */}
          <SoftwareList />
          {(user?.roles?.includes("ADMIN") || user?.roles?.includes("DEVELOPER") || user?.roles?.includes("SUPERADMIN")) && (
            <> {/* Release Ops. */}
                    <Tooltip key="release-ops">
                      <TooltipTrigger asChild className="h-8 w-8">
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-10",
                            expanded ? "w-full justify-start gap-3 px-3" : "w-10"
                          )}
                          asChild
                        >
                          <a
                            href={releaseOpsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LoaderPinwheel className="h-8 w-8 shrink-0" />
                            {expanded ? (
                              <span className="truncate text-sm">Release Ops.</span>
                            ) : (
                              <span className="sr-only">Release Ops.</span>
                            )}
                          </a>
                        </Button>
                      </TooltipTrigger>
                      {!expanded && (
                        <TooltipContent side="right" sideOffset={5}>
                          Release Ops.
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </>
          )}
        
          {/* Settings */}
          <Tooltip key="settings">
            <TooltipTrigger asChild className="h-8 w-8">
              <Button
                variant="ghost"
                className={cn(
                  "h-10",
                  expanded ? "w-full justify-start gap-3 px-3" : "w-10"
                )}
                asChild
              >
                <Link to={`${IKON_PLATFORM_UI_URL}/settings`}>
                  <Settings className="h-8 w-8 shrink-0" />
                  {expanded ? (
                    <span className="truncate text-sm">Settings</span>
                  ) : (
                    <span className="sr-only">Settings</span>
                  )}
                </Link>
              </Button>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            )}
          </Tooltip>

          {/* User Avatar */}
          <UserAvatar />
          {/* Collapse / expand toggle */}
          <div
            className={cn(
              "mb-2 flex",
              expanded ? "justify-end" : "justify-center"
            )}
          >
            <Tooltip key="toggle-sidebar">
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={expanded ? "default" : "icon"}
                  className={cn(
                    "h-8",
                    expanded ? "w-full justify-start gap-3 px-3" : "w-8"
                  )}
                  onClick={toggle}
                >
                  {expanded ? (
                    <PanelLeftClose className="h-5 w-5 shrink-0" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5 shrink-0" />
                  )}
                  {expanded ? (
                    <span className="truncate text-sm">Collapse</span>
                  ) : (
                    <span className="sr-only">Expand sidebar</span>
                  )}
                </Button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" sideOffset={5}>
                  Expand sidebar
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </aside>
      </TooltipProvider>
  );
};
