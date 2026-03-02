import {
  Settings,
} from "lucide-react";
import { Button } from "../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip";
import { Link } from "react-router-dom";
import { getConfig } from "../../utils/config";
import UserAvatar from "./userAvatar";
import Accounts from "./accounts";
import SoftwareList from "./software-list";

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

export const MainSidebar = () => {
  const { IKON_PLATFORM_UI_URL } = getConfig();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-20 h-screen w-12 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 ">
        {/* Account */}
        <Accounts />

        {/* Softwares */}
        <SoftwareList />

        {/* Settings */}
        <Tooltip key="settings">
          <TooltipTrigger asChild className="h-8 w-8">
            <Button variant="ghost" className="h-10 w-10" asChild>
              <Link to={`${IKON_PLATFORM_UI_URL}/settings`}>
                <Settings className="h-8 w-8" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>

        {/* User Avatar */}
        <UserAvatar />
      </aside>
    </TooltipProvider>
  );
};
