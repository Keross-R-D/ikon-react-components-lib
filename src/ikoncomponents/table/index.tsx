import React, { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Reload } from "../reload-component";
import { DataTable } from "./DataTable";
import { DataTableSearch } from "./DataTableSearch";
import { DataTablePagination } from "./DataTablePagination";
import { DataTablePageSize } from "./DataTablePageSize";
import { DataTableLayoutProps } from "./type";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useSearchParams } from "react-router";
import { hi } from "date-fns/locale";

export function DataTableLayout<T>({
  data,
  columns,
  totalPages,
  actionNode,
  toggleViewMode,
  gridComponent,
  isLoading = false,
  onReload,
  filterComponent,
  hiddenColumns
}: DataTableLayoutProps<T>) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  
  return (
    <div className="space-y-6"> 
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          {/* Now passing props to the search component */}
          {/* <DataTableSearch  /> */}
          {/* {filterComponent && filterComponent} */}
        </div>

        {/* <div className="flex items-center gap-2">
          {actionNode && actionNode}
          <div className="flex items-center border border-border rounded-md bg-background overflow-hidden h-9">
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
          </div>
        </div> */}
      </div>

      <div className="relative min-h-[300px]">
        <Reload
          isLoading={isLoading}
          onReload={onReload || (() => window.location.reload())}
        />

        <div
          className={`transition-all duration-300 ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {/* {viewMode === "list" ? ( */}
            <DataTable
            data={data}
            columns={columns}
            totalPages={totalPages}
            actionNode={actionNode}
            // onRowClick={onRowClick}
            toggleViewMode={toggleViewMode}
            hiddenColumns={hiddenColumns}
            showFooter={true}
            footerLabel={"Total Leads"}
            filterComponent={filterComponent}
            gridComponent={gridComponent}   
              // keyExtractor={keyExtractor}
              // onRowClick={onRowClick}
              // table={table}
            />
          {/* ) : gridComponent ? (
            gridComponent(data)
          ) : (
            <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
              Grid view not implemented for this component yet.
            </div>
          )} */}
        </div>
      </div>

      {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border mt-4">
        {/* Now passing props to PageSize and Pagination */}
        {/* <DataTablePageSize table={table}/>
        <DataTablePagination
          table={table}
          totalPages={totalPages}
          currentPage={currentPage}
        /> 
      </div> */}
    </div>
  );
}