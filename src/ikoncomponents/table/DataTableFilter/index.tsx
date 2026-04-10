import React, { useState, useRef, useEffect, useMemo } from "react";
import { Filter, X, ChevronDown, Check, RotateCcw, Search, ListFilter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Input } from "@base-ui/react";
import { Button } from "@/shadcn/ui/button";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { SearchInput } from "@/index";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export function DataTableFilter({ table }: { table: any }) {
  const [showMainBtn, setShowMainBtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);

  // Syncing with Table State: Which columns currently have a filter active?
  const activeFilters = table.getState().columnFilters;

  const columns = table.getAllLeafColumns().filter((col: any) => col.getCanFilter());
  const filteredColumns = columns.filter((col: any) =>
    col.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (mainRef.current && !mainRef.current.contains(e.target as Node)) setShowMainBtn(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center gap-3 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className=" gap-2">
            <ListFilter className="w-4 h-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-2">
          <DropdownMenuLabel className="text-center">Filter</DropdownMenuLabel>
          <div className="p-2">
            <div className="relative mb-2">
              <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <SearchInput
                placeholder="Search columns..."
                // className="pl-8 h-8"
                value={searchQuery}
                onChange={(e : any) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-50 overflow-auto  space-y-1 scroll-m-1">
              {filteredColumns.map((col: any) => {
                const isActive = activeFilters.some((f: any) => f.id === col.id);
                return (
                  <div key={col.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm transition-colors cursor-pointer">
                    <Checkbox 
                      id={col.id}
                      checked={isActive}
                      onCheckedChange={(checked) => {
                        checked ? col.setFilterValue([]) : col.setFilterValue(undefined);
                      }}
                    />
                    <label htmlFor={col.id} className="text-sm font-medium leading-none cursor-pointer flex-1">
                      {typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="flex gap-2 p-1">
            <Button size="sm" className="flex-1 h-8" onClick={() => table.resetColumnFilters()}>
              <RotateCcw className="mr-2 h-3 w-3" /> Reset
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function FilterTagSpacer({ activeFilters, table }: { activeFilters: any; table: any }) {
  return (
    // {/* --- ACTIVE FILTER TAGS --- */}
      <div className="flex flex-wrap gap-2 min-w-max max-w-[70%] overflow-y-auto">
        {activeFilters.map((filter: any) => (
          <FilterTag key={filter.id} filter={filter} table={table} />
        ))}
      </div>
  );
}

// --- INDIVIDUAL TAG COMPONENT WITH VALUE DROPDOWN ---
function FilterTag({ filter, table }: { filter: any, table: any }) {
  debugger
  const [isOpen, setIsOpen] = useState(false);
  const [tempValues, setTempValues] = useState<any[]>(filter.value || []);
  const tagRef = useRef<HTMLDivElement>(null);
  const column = table.getColumn(filter.id);

  // Auto-update local state if filter is reset globally
  useEffect(() => {
    setTempValues(filter.value || []);
  }, [filter.value]);

  // Extract unique values from data
  const uniqueValues = useMemo(() => {
    const set = new Set();
    table.getPreFilteredRowModel().flatRows.forEach((row: any) => {
      const val = row.getValue(filter.id);
      if (val !== null && val !== undefined) set.add(val);
    });
    return Array.from(set).sort();
  }, [table.getPreFilteredRowModel().flatRows, filter.id]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (tagRef.current && !tagRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleApplyValues = () => {
    column.setFilterValue(tempValues.length > 0 ? tempValues : undefined);
    setIsOpen(false);
  };

  const handleResetValues = () => {
    setTempValues([]);
    column.setFilterValue(undefined);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-1  " ref={tagRef}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 rounded-full px-3 text-xs border border-dashed">
            <span className="font-bold uppercase text-muted-foreground mr-1">
               {typeof column.columnDef.header === 'string' ? column.columnDef.header : filter.id}:
            </span>
            <span className="text-primary font-semibold">
              {filter.value?.length ? `${filter.value.length} Selected` : "All"}
            </span>
            <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-0" align="start">
          <div className="p-2 max-h-48 overflow-y-auto">
            {uniqueValues.map((val: any) => (
              <div key={val} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm transition-colors cursor-pointer">
                <Checkbox 
                  id={`${filter.id}-${val}`}
                  checked={tempValues.includes(val)}
                  onCheckedChange={(checked) => {
                    setTempValues(prev => 
                      checked ? [...prev, val] : prev.filter(v => v !== val)
                    );
                  }}
                />
                <label htmlFor={`${filter.id}-${val}`} className="text-xs flex-1 truncate cursor-pointer">
                  {String(val).trim() === ""?  "N/A" : String(val)}
                </label>
              </div>
            ))}
          </div>
          <div className="p-2 border-t bg-muted/50 flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 h-7 text-[10px]" 
              onClick={() => handleApplyValues()}
            >
              Apply
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-7 text-[10px]" 
              onClick={() => {
                handleResetValues();
              }}
            >
              Clear
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Quick Remove Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 rounded-full hover:text-destructive"
        onClick={() => column.setFilterValue(undefined)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}