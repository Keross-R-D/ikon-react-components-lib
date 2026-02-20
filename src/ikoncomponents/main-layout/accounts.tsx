import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { useAccountMembership, useSwitchAccountMutation } from "@/utils/api/platformServiceQuery";
import type { AccountMembership } from "./main-sidebar";
import { useUser } from "@/utils/userContext";
import { Check } from "lucide-react";
import { useEffect } from "react";


function Accounts() {
    const { data:accounts } = useAccountMembership();
    const {user, setAccountName} = useUser();    
    const getInitials = (name: string) => {
        
      return name ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) : "UN";
    };

    useEffect(()=>{
        const activeAccount = accounts?.find((account: AccountMembership) => account.accountId === user?.activeAccountId);
        setAccountName(activeAccount?.accountName || "");
    },[accounts])

    const {mutateAsync} = useSwitchAccountMutation();
    const switchAccount = async (account: AccountMembership) => {
        await mutateAsync(account.accountId);
        setAccountName(account.accountName);
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="mb-4 h-8 w-8 rounded-lg p-0"
          disabled={!user?.accountName}
        >
          <span className="text-base font-medium text-accent-background">
            {user ? getInitials(user.accountName!) : "..."}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-55"
        side="right"
        sideOffset={8}
        align="start"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-foreground">
          Accounts
        </div>
        {accounts?.map((account) => (
          <DropdownMenuItem
            key={account.accountId}
            className="flex items-center justify-between cursor-pointer"
            onClick={async () => {
              try {
                await switchAccount(account);
                window.location.reload();
              } catch (error) {
                console.error("Switch account failed", error);
              }
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {getInitials(account.accountName)}
                </span>
              </div>
              <span className="text-sm">{account.accountName}</span>
            </div>

            {user?.activeAccountId === account.accountId && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Accounts;
