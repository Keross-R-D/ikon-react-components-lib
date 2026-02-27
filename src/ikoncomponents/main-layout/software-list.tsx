import { Button } from "@/shadcn/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { FolderCode, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "../icon";
import { getConfig } from "@/utils/config";
import { useAllSoftwaresQuery } from "@/utils/api/platformServiceQuery";

function SoftwareList() {
  const { IKON_PLATFORM_UI_URL } = getConfig();
  const { data } = useAllSoftwaresQuery();
  const softwares = data?.filter((item: { visible: boolean }) => item.visible);
  function toPascalCase(icon: string) {
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }
  return (
    <>
      {" "}
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
        {softwares?.map((software) => {
          const hasIcon = Boolean(software.icon && software.icon.trim() !== "");

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
    </>
  );
}

export default SoftwareList;
