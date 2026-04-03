import { useReactTable, ColumnDef } from "@tanstack/react-table";


export interface DataTableLayoutProps<T> {
  data: T[];
  columns: ColumnsProps<T, unknown>[];
  // keyExtractor: (row: T) => string | number;
  totalPages: number;
  toggleViewMode?: boolean;
  // currentPage: number;
  hiddenColumns?: string[];
  filterComponent?: React.ReactNode;
  actionNode?: React.ReactNode;
  onRowClick?: (row: T) => void;
  gridComponent?: (data: T[]) => React.ReactNode;
  isLoading?: boolean;
  onReload?: () => void;
  showFooter?: boolean;
  footerLabel?: string;
}

export type ColumnsProps<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  header: string | (() => React.ReactNode);
  accessorKey?: keyof TData;
  cell?: (row: TData) => React.ReactNode;
  footer?: (row: TData) => React.ReactNode;
};

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  table: any;
}