import { ColumnDef } from "@tanstack/react-table";
import { ActionMenuProps } from "../action-menu/type";

export interface DataTableLayoutProps<T> {
  data: T[];
  columns: ColumnsProps<T, unknown>[];
  extraTools?: ExtraPrams<T>;
}

export type ExtraPrams<T> = {
  totalPages: number;
  toggleViewMode?: boolean;
  hiddenColumns?: string[];
  actionNode?: React.ReactNode;
  actionMenu?: TableActionMenuProps;
  groupActionMenu?: TableActionMenuProps;
  gridComponent?: (data: T[]) => React.ReactNode;
  isLoading?: boolean;
  onReload?: () => void;
  showFooter?: boolean;
  footerLabel?: string;
  fileName?: string;
};

export type ColumnsProps<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  header: string | (() => React.ReactNode);
  // accessorKey?: keyof TData;
  //cell?: (row: TData) => React.ReactNode;
  footer?: (row: TData) => React.ReactNode;
  filterFns?: string | "multiSelect";
  draggable?: boolean | undefined;
  headerClassName?: string;
};

export type TableActionMenuProps = {
  items: ActionMenuProps[];
  extraArguments?: any[];
};
