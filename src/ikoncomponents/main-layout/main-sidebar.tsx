"use client";

import * as React from "react";
import {
  FolderCode,
  Home,
  Settings,
} from "lucide-react";
import { Button } from "../../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn/ui/tooltip";

import { getValidAccessToken } from "../../utils/token-management";
import axios from "axios";
// import { redirect } from "next/navigation";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { Icon } from "../icon";
import { useRefresh } from "./RefreshContext";
import { getConfig } from "../../utils/config";
import UserAvatar from "./userAvatar";
import Accounts from "./accounts";

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
  const [softwares, setSoftwares] = React.useState<Software[]>([]);
  const { refreshCounter } = useRefresh();
  const { IKON_BASE_API_URL, IKON_PLATFORM_UI_URL } = getConfig();


  function toPascalCase(icon: string) {
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // Fetch all data
  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        // const accessToken = await getValidAccessToken(baseUrl, {
        //   platformUrl,
        //   isSetToken: true,
        // });
        const accessToken = await getValidAccessToken({ isSetToken: true });

        // const decoded = jwtDecode<DecodedAccessToken>(accessToken ?? "");

        // Fetch all data in parallel
        const [softwaresResponse] =
          await Promise.all([
            axios.get(
              `${IKON_BASE_API_URL}/platform/software/accessible/user`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            ),
          ]);


        // const primaryAccount = accountsResponse.data.find(
        //   (account) => account.primaryAccount === true
        // );

        // if (primaryAccount) {
        //   setSelectedAccount(primaryAccount);
        // }

        const visibleSoftwares = softwaresResponse.data.filter(
          (item: { visible: boolean }) => item.visible,
        );
        setSoftwares(visibleSoftwares);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAllData();
  }, [refreshCounter]);

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-20 h-screen w-12 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 ">
        {/* Account */}
        <Accounts />

        {/* Softwares */}
        <nav className="flex flex-col gap-1">
          <Tooltip key={"home"}>
            <TooltipTrigger asChild className="h-8 w-8">
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <Link to={`${IKON_PLATFORM_UI_URL}/home`}>
                  <Home className="h-8 w-8" />
                  <span className="sr-only">Home</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="flex flex-col gap-1 flex-1">
          {softwares.map((software) => {
            const hasIcon = Boolean(
              software.icon && software.icon.trim() !== "",
            );

            return (
              <Tooltip key={software.softwareName}>
                <TooltipTrigger asChild className="h-8 w-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    asChild
                  >
                    <Link to={software.url ?? "#"}>
                      {hasIcon ? (
                        <Icon
                          name={toPascalCase(software.icon ?? "")}
                          className="h-8 w-8"
                        />
                      ) : (
                        <FolderCode className="h-8 w-8" />
                      )}

                      <span className="sr-only">{software.softwareName}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="right" sideOffset={5}>
                  {software.softwareName}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Settings */}
        <Tooltip key="settings">
          <TooltipTrigger asChild className="h-8 w-8">
            <Button variant="ghost" className="h-10 w-10" asChild>
              <Link to={`${IKON_BASE_API_URL}/settings`}>
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
