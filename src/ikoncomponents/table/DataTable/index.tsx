import React, { useMemo, useState, useEffect, use } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp, LayoutGrid, List, Settings2, X } from "lucide-react";
import { DataTableSearch } from "../DataTableSearch";
import { se } from "date-fns/locale";
import { DataTablePageSize } from "../DataTablePageSize";
import { DataTablePagination } from "../DataTablePagination";
import { DataTableFilter, FilterTagSpacer } from "../DataTableFilter";
import { DataTableColumns } from "../DataTableColumn";
import { DataTableLayoutProps } from "../type";

// Assuming your converted components are in the same dire

export function DataTable<T>({ 
  data, 
  columns, 
  totalPages ,
  toggleViewMode,
  gridComponent,
  actionNode,
  filterComponent,
  showFooter, // New prop
  footerLabel,
  hiddenColumns,
}: DataTableLayoutProps<T>) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // 1. Sync State from URL
  const pageIndex = Number(searchParams.get("page") || "1") - 1;
  const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
      });
  const [globalFilter, setGlobalFilter] = React.useState("");

  // 2. Internal UI States (Sorting, Grouping, Expanded)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<string[]>([]);
  const [expanded, setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 3. Configure Table
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    meta : {
      footerLabel: footerLabel,
    },
    state: {
      pagination: pagination,
      globalFilter,
      sorting,
      grouping,
      expanded,
      rowSelection,
      columnVisibility,
      columnFilters
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    
    // Manual Mode for Server-Side Logic (URL-Driven)
    manualPagination: false,
    manualFiltering: false,
    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    filterFns: {
    // Custom filter to check if row value exists in selected array
    multiSelect: (row, columnId, filterValue) => {
    debugger

      if (!filterValue.length) return true;
      return filterValue.includes(String(row.getValue(columnId)));
    },
  },
  });
  useEffect(() => {
  table.getAllLeafColumns().map((column) => {
      if (hiddenColumns?.includes(column.id)) {
        column.toggleVisibility(false);
      }
  });
}, [hiddenColumns, table]);

  // 4. Drag & Drop Logic for Grouping (from your code)
  const handleDragStart = (e: React.DragEvent, headerId: string) => {
    e.dataTransfer.setData("headerId", headerId);
  };

  const handleDrop = (e: React.DragEvent) => {
    debugger
    e.preventDefault();
    const headerId = e.dataTransfer.getData("headerId");
    if (headerId && !grouping.includes(headerId)) {
      table.getColumn(headerId)?.toggleGrouping();
    }
  };

  useEffect(() => { 
    // Sync globalFilter to URL when it changes
    debugger
    table.setGlobalFilter(searchParams.get("search") || "");
  }, [searchParams, navigate, pathname]);

  useEffect(() => {

    table.setPageSize(Number(searchParams.get("size") || "10"));
    table.setPageIndex(Number(searchParams.get("page") || "1") -1);
  }, [searchParams,navigate, pathname]);
  
  

  return (
    <div className="space-y-2">
      {/* Search & Toolbar Area */}
      <div className="flex items-center justify-between gap-2">
       <div className="flex items-center gap-2">
          {/* Now passing props to the search component */}
          <DataTableSearch  />
          <FilterTagSpacer activeFilters={table.getState().columnFilters} table={table} />
          {/* <DataTableFilter onFilterChange={(status) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("status", status);
            navigate(`${pathname}?${params.toString()}`);
          }} /> */}
          

          {filterComponent && filterComponent}
        </div>

        

        <div className="flex items-center gap-2">
          {actionNode && actionNode}
          {/* Common Controls (Columns, Filters, View Toggle) */}
          <DataTableColumns table={table} />
          <DataTableFilter table={table} />
          {toggleViewMode && 
          (<div className="flex items-center border border-border rounded-md bg-background overflow-hidden h-9">
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 h-full flex items-center justify-center transition-colors ${
                viewMode === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 h-full flex items-center justify-center transition-colors ${
                viewMode === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>)}
        </div>
      </div>
      {viewMode === "list" ? (
      // {/* Grouping Drop Zone */}
      <><div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border border-dashed rounded-md h-10  p-2 flex gap-2 items-center text-sm bg-muted/20 "
      >
        {grouping.length === 0 ? (
          <span className="text-muted-foreground">Drag a column header here to group</span>
        ) : (
          grouping.map((gid) => (
            <div key={gid} className="flex  items-center gap-1 bg-background border px-2 py-1 rounded shadow-sm">
              {gid}
              <X size={14} className="cursor-pointer" onClick={() => table.getColumn(gid)?.toggleGrouping()} />
            </div>
          ))
        )}
      </div>
      

      {/* Main Table */}
      <div className="rounded-md border border-border bg-background overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none"
                    draggable
                    onDragStart={(e) => handleDragStart(e, header.id)}
                  >
                    <div className="flex items-center gap-2" onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUp size={14} />,
                        desc: <ChevronDown size={14} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                className={`hover:bg-muted/30 transition-colors ${row.getIsSelected() ? 'bg-accent/20' : ''}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {cell.getIsGrouped() ? (
                      <button 
                        onClick={row.getToggleExpandedHandler()}
                        className="flex items-center gap-2 font-semibold"
                      >
                        {row.getIsExpanded() ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
                      </button>
                    ) : cell.getIsAggregated() ? (
                      flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                    ) : cell.getIsPlaceholder() ? null : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Conditionally Render Footer */}
          {showFooter && (
            <tfoot className="bg-muted/30 border-t-2 border-border font-bold">
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <td key={header.id} className="px-4 py-3 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <DataTablePageSize />
        <DataTablePagination totalPages={totalPages} currentPage={pageIndex + 1} />
      </div>
      </>
      ) : gridComponent ? (
            gridComponent(data)
          ) : (
            <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
              Grid view not implemented for this component yet.
            </div>
          )}
    </div>
  );
}