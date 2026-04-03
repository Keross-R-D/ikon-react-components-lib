import { Settings2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function DataTableColumns({ table }: { table: any }) {
  // Initialize as false
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center gap-2 px-3 h-9 border rounded-md bg-background transition-colors text-sm font-medium ${
          showMenu ? "border-primary bg-muted" : "border-border hover:bg-muted"
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <Settings2 className="w-4 h-4" />
        Columns
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 z-50 bg-background border border-border rounded-md shadow-lg p-2 animate-in fade-in zoom-in duration-100">
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-b mb-1">
            Toggle Columns
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {table.getAllLeafColumns().map((column: any) => {
              // Skip columns that don't have an ID or are special (like selection)
              if (!column.getCanHide()) return null;

              return (
                <label
                  key={column.id}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm capitalize"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="truncate">
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="border-t mt-1 pt-1">
            <button
              type="button"
              onClick={() => table.toggleAllColumnsVisible(true)}
              className="w-full text-left px-2 py-1.5 text-xs hover:bg-muted hover:text-primary rounded"
            >
              Show All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}