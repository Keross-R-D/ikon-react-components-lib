
import { Reload } from "../reload-component";
import { DataTable } from "./DataTable";
import { DataTableLayoutProps } from "./type";

export function DataTableLayout<T>({
  data,
  columns,
  extraTools
}: DataTableLayoutProps<T>) {

  
  return (
    <div className="space-y-6"> 

      <div className="relative min-h-[300px]">
        <Reload
          isLoading={extraTools?.isLoading}
          onReload={extraTools?.onReload || (() => window.location.reload())}
        />

        <div className={`transition-all duration-300 ${ extraTools?.isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            <DataTable
              data={data}
              columns={columns}
              extraTools={extraTools}
            />
        </div>
      </div>
    </div>
  );
}