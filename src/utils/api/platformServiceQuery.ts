import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosAuth";
import type { User } from "@/types/user";
import type { Account } from "@/types/account";
import { getConfig } from "@/utils/config";
import type { Software, AccountMembership } from "@/ikoncomponents/main-layout/main-sidebar";

export function useProfileQuery(userId?: string) {
  return useQuery<User>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No userId");
      const response = await axiosInstance.get<User>(
        `${getConfig().IKON_USER_API_URL}/${userId}`,
      );
      return response.data;
    },
    enabled: !!userId,
  });
}

export function useUserListQuery() {
  return useQuery<User>({
    queryKey: ["userList"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(
        `${getConfig().IKON_USER_API_URL}/current`,
      );
      return data;
    },
  });
}

export function useAllAccountsQuery() {
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Account[]>(
        `${getConfig().IKON_ACCOUNT_API_URL}/all`,
      );
      return data;
    },
  });
}

export function useSwitchAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (accountId: string) => {
      await axiosInstance.post(
        `${getConfig().IKON_AUTH_API_URL}/switch-account`,
        { targetAccountId: accountId },
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["accounts"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useAccountMembership() {
  return useQuery<AccountMembership[]>({
    queryKey: ["accountMembership"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AccountMembership[]>(
        `${getConfig().IKON_BASE_API_URL}/platform/user/account-membership`,
      );
      return data;
    },
  });
}

export function useAllSoftwaresQuery() {
  return useQuery<Software[]>({
    queryKey: ["softwares"],
    queryFn: async () => {
      const {data} = await axiosInstance.get<Software[]>(
        `${getConfig().IKON_BASE_API_URL}/platform/software/accessible/user`,
      );
      return data;
    },
  })
}
