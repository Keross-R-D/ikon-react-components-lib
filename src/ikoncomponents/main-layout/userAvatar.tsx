import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown-menu";
import { Button } from "../../shadcn/ui/button";
import { CircleUserRound, LogOut } from "lucide-react";
import { clearTokensAndLogout } from "../../utils/token-management";
import { useProfileQuery } from "../../utils/api/platformServiceQuery";
import { getConfig } from "../../utils/config";
import { useUser } from "../../utils/userContext";

function UserAvatar() {
  const { user, setUser } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <CircleUserRound className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55 p-0" side={"right"} sideOffset={8}>
        <div className="flex items-start gap-3 p-4 bg-card">
          <CircleUserRound className="h-8 w-8" />
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground blue-dark:text-muted-foreground truncate">
              {user?.userName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.userEmail}
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              {/* {selectedAccount?.accountName} */}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="my-0" />

        <DropdownMenuItem
          onClick={async () => {
            clearTokensAndLogout();
          }}
          className="flex items-center gap-2 px-4 py-3 cursor-pointer focus:bg-destructive dark:focus:bg-destructive blue-dark:focus:bg-destructive"
        >
          <LogOut className="h-4 w-4 text-foreground" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
