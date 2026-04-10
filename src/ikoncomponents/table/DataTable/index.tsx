import React, {  useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp, Download, LayoutGrid, List, Settings2, X } from "lucide-react";
import { DataTableSearch } from "../DataTableSearch";
import { DataTablePageSize } from "../DataTablePageSize";
import { DataTablePagination } from "../DataTablePagination";
import { DataTableFilter, FilterTagSpacer } from "../DataTableFilter";
import { DataTableColumns } from "../DataTableColumn";
import { DataTableLayoutProps } from "../type";
import { Button } from "@/shadcn/ui/button";

// Assuming your converted components are in the same dire

export function DataTable<T>({ 
  data, 
  columns, 
  extraTools
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
  const hiddenColumns = extraTools?.hiddenColumns || [];

  for (const col of columns) {
    if (col.filterFn === undefined) {
      col["filterFns"] = "multiSelect"; // Set default filter function to "multiSelect" if not provided
       // Make columns draggable by default
    } 
    if (col.draggable === undefined) {
      col["draggable"] = true;
    }
  }

  // 3. Configure Table
  const table = useReactTable({
    data,
    columns,
    pageCount: extraTools?.totalPages,
    meta : {
      footerLabel: extraTools?.footerLabel,
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
    debugger
    
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
    if (headerId && !grouping.includes(headerId) && table.getColumn(headerId)?.getCanGroup()) {
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
  
  const handleExport = () => {
    // 1. Get only the columns that are currently visible in the UI
  const visibleColumns = table.getVisibleLeafColumns()
    .filter(col => col.id !== "select" && col.id !== "actions");

    // --- RECURSIVE FUNCTION ---
  const processRows = (rows: any, level = 0) => {
    return rows.flatMap((row : any) => {
      if (row.getIsGrouped()) {
        // 1. This is a Group Header Row
        const groupValue = String(row.id.replaceAll(`${visibleColumns[0].id}:`, "")).trim() === "" || row.id.replaceAll(`${row.parentId ? `${row.parentId}>` : ``}`, "").replaceAll(`${row.groupingColumnId}>`,"").replaceAll(`${visibleColumns[0].id}:`, "").trim() === undefined ? "N/A" : row.id.replaceAll(`${row.parentId ? `${row.parentId}>` : ``}`, "").replaceAll(`${visibleColumns[0].id}:`, "").trim();
        
        // Create the header row. We indent the text based on level for visual clarity in Excel.
        const headerRow = {
          [visibleColumns[0].id]: `${"  ".repeat(level)} ${groupValue} (${row.subRows.length})`
        };

        // 2. Recursively process the subRows (could be more groups or final data)
        return [headerRow, ...processRows(row.subRows, level + 1)];
      } else {
        // 3. This is an actual Data Row (Leaf)
        let rowData: Record<string, any> = {};
        visibleColumns.forEach((col) => {
          // Add indentation to the first column to show it belongs to the group above
          const value = row.getValue(col.id); 
            rowData[col.id] = (col.id === visibleColumns[0].id) || (value === "Actions" || value === "actions") 
              ? "    "// + (value ?? "") 
              : value === undefined ? "N/A" : value; // Handle empty/undefined values
        });
        return [rowData];
      }
    });
  };

  // Decide which model to use based on your checkGrouping state
  const finalData = table.getState().grouping.length > 0
    ? processRows(table.getGroupedRowModel().rows)
    : table.getFilteredRowModel().rows.map(row => {
        let rowData: Record<string, any> = {};
        visibleColumns.forEach(col => rowData[col.id] = row.getValue(col.id));
        return rowData;
      });

  // 3. Create and download
  const worksheet = XLSX.utils.json_to_sheet(finalData);

  // 4. --- AUTO-SIZE COLUMN WIDTH LOGIC ---
  const colWidths = visibleColumns.map((col) => {
    const header = typeof col.columnDef.header === "string" ? col.columnDef.header : col.id;
    
    // Find the longest string in this column (header vs all row values)
    const maxCharLength = Math.max(
      header.length,
      ...finalData.map((row: any) => String(row[header]).length)
    );

    // Set width (adding 2 or 3 for extra padding/breathing room)
    return { wch: maxCharLength + 3 };
  });

  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
  XLSX.writeFile(workbook, `${extraTools?.fileName}.xlsx`);
  };
  

  return (
    <div className="space-y-2">
      {/* Search & Toolbar Area */}
      <div className="flex items-center justify-between gap-2">
       <div className="flex items-center gap-2">
          {/* Now passing props to the search component */}
          <DataTableSearch  />
          <FilterTagSpacer activeFilters={table.getState().columnFilters} table={table} />
         
          
        </div>

        

        <div className="flex items-center gap-2">
          {extraTools?.actionNode && extraTools?.actionNode}
          {/* Common Controls (Columns, Filters, View Toggle) */}
          <DataTableColumns table={table} />
          <DataTableFilter table={table} />
          <Button variant="outline" size="sm" className=" gap-2" onClick={() => handleExport()}>
            <Download className="w-4 h-4" />
          </Button>
          {extraTools?.toggleViewMode && 
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
          {extraTools?.showFooter && (
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
        <DataTablePagination totalPages={extraTools?.totalPages} currentPage={pageIndex + 1} />
      </div>
      </>
      ) : extraTools?.gridComponent ? (
            extraTools.gridComponent(data)
          ) : (
            <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
              Grid view not implemented for this component yet.
            </div>
          )}
    </div>
  );
}