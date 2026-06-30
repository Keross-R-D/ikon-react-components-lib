import { Button } from "@/shadcn/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { FolderCode, Home } from "lucide-react";
import { Link } from "react-router";
import { Icon } from "../icon";
import { cn } from "@/shadcn/lib/utils";
import { getConfig } from "@/utils/config";
import { useAllSoftwaresQuery } from "@/utils/api/platformServiceQuery";
import { useSidebarExpanded } from "./sidebar-expanded-context";

function SoftwareList() {
  const { IKON_PLATFORM_UI_URL } = getConfig();
  const { data: softwares } = useAllSoftwaresQuery();
  const expanded = useSidebarExpanded();

  function toPascalCase(icon: string) {
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }
  return (
    <>
      {" "}
      <nav className="flex flex-col gap-1 w-full">
        <Tooltip key={"home"}>
          <TooltipTrigger asChild className="h-8 w-8">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10",
                expanded ? "w-full justify-start gap-3 px-3" : "w-10"
              )}
              asChild
            >
              <Link to={`${IKON_PLATFORM_UI_URL}/home`}>
                <Home className="h-8 w-8 shrink-0" />
                {expanded ? (
                  <span className="truncate text-sm">Home</span>
                ) : (
                  <span className="sr-only">Home</span>
                )}
              </Link>
            </Button>
          </TooltipTrigger>
          {!expanded && (
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
          )}
        </Tooltip>
      </nav>
      <nav className="flex flex-col gap-1 flex-1 w-full">
        {softwares?.map((software) => {
          if (!software.visible) return null;
          const hasIcon = Boolean(software.icon && software.icon.trim() !== "");

          return (
            <Tooltip key={software.softwareName}>
              <TooltipTrigger asChild className="h-8 w-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-10",
                    expanded ? "w-full justify-start gap-3 px-3" : "w-10"
                  )}
                  asChild
                >
                  <Link to={software.url ?? "#"}>
                    {hasIcon ? (
                      <Icon
                        name={toPascalCase(software.icon ?? "")}
                        className="h-8 w-8 shrink-0"
                      />
                    ) : (
                      <FolderCode className="h-8 w-8 shrink-0" />
                    )}

                    {expanded ? (
                      <span className="truncate text-sm">
                        {software.softwareName}
                      </span>
                    ) : (
                      <span className="sr-only">{software.softwareName}</span>
                    )}
                  </Link>
                </Button>
              </TooltipTrigger>

              {!expanded && (
                <TooltipContent side="right" sideOffset={5}>
                  {software.softwareName}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </nav>
    </>
  );
}

export default SoftwareList;
