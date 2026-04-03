import React, { useState, useRef, useEffect, useMemo } from "react";
import { Filter, X, ChevronDown, Check, RotateCcw, Search, ListFilter } from "lucide-react";

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
    <div className="flex flex-wrap items-center gap-3">
      {/* --- MAIN COLUMN SELECTOR DROPDOWN --- */}
      <div className="relative" ref={mainRef}>
        <button
          onClick={() => setShowMainBtn(!showMainBtn)}
          className={`flex items-center gap-2 px-3 h-9 border rounded-md bg-background text-sm font-medium transition-all ${
            showMainBtn ? "border-primary ring-1 ring-primary" : "border-border hover:bg-muted"
          }`}
        >
          <ListFilter className="w-4 h-4" />
          Filter
        </button>

        {showMainBtn && (
          <div className="absolute  mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-xl ">
            <div className="p-3 border-b text-center font-bold text-gray-800 text-sm">
              Columns For Filtering
            </div>
            
            <div className="p-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <input
                  placeholder="Search columns..."
                  className="w-full pl-8 pr-2 py-1.5 border rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                {filteredColumns.map((col: any) => {
                  const isActive = activeFilters.some((f: any) => f.id === col.id);
                  return (
                    <label key={col.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-sm group">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isActive}
                        onChange={() => {
                          if (isActive) col.setFilterValue(undefined);
                          else col.setFilterValue([]); // Init as empty array for multi-select
                        }}
                      />
                      <span className="text-gray-700 group-hover:text-black">
                         {typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="p-3 border-t bg-gray-50 flex gap-2 rounded-b-md">
              <button 
                onClick={() => setShowMainBtn(false)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
              >
                <Check size={14} /> Apply
              </button>
              <button 
                onClick={() => {
                  table.resetColumnFilters();
                  setShowMainBtn(false);
                }}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-gray-300 bg-white text-gray-600 rounded text-xs font-semibold hover:bg-gray-50"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}

export function FilterTagSpacer({ activeFilters, table }: { activeFilters: any; table: any }) {
  return (
    // {/* --- ACTIVE FILTER TAGS --- */}
      <div className="flex flex-wrap gap-2">
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
    <div className="relative" ref={tagRef}>
      <div className="flex items-center border border-gray-300 rounded-full bg-white px-3 py-1 text-xs shadow-sm">
        <span className="font-bold text-gray-500 uppercase mr-1 tracking-tight">
            {typeof column.columnDef.header === 'string' ? column.columnDef.header : filter.id}:
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800">
          {filter.value?.length ? `${filter.value.length} Selected` : "All"}
          <ChevronDown size={12} />
        </button>
        <button onClick={() => column.setFilterValue(undefined)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
          <X size={14} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-[110]">
          <div className="p-2 max-h-48 overflow-y-auto space-y-1">
            {uniqueValues.map((val: any) => (
              <label key={val} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 border-gray-300"
                  checked={tempValues.includes(val)}
                  onChange={() => {
                    setTempValues(prev => 
                      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
                    );
                  }}
                />
                <span className="truncate">{String(val)}</span>
              </label>
            ))}
          </div>
          
          <div className="p-2 border-t bg-gray-50 flex gap-2 rounded-b-md">
            <button 
              onClick={handleApplyValues}
              className="flex-1 py-1 px-2 bg-blue-600 text-white rounded text-[10px] font-bold hover:bg-blue-700"
            >
              Apply
            </button>
            <button 
              onClick={handleResetValues}
              className="flex-1 py-1 px-2 border border-gray-300 bg-white text-gray-600 rounded text-[10px] font-bold hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}