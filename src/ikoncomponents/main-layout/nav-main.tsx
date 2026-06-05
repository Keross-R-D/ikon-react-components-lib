import { useCallback, memo, ReactNode, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shadcn/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SidebarNavItem, useSidebarNav } from "./SidebarNavContext";

export function NavMain() {
  const { navItems } = useSidebarNav();
  const { pathname } = useLocation();

  // Optimized active state detection
  const isHrefActive = useCallback((url?: string) => {
    if (!url) return false;
    // Check if the current pathname matches the url or is a sub-path
    return pathname === url || pathname.startsWith(url + "/");
  }, [pathname]);

  const isNodeActive = useCallback((node: SidebarNavItem): boolean => {
    const checkActive = (item: SidebarNavItem): boolean => {
      if (isHrefActive(item.url)) return true;
      return !!item.items?.some(child => checkActive(child));
    };
    return checkActive(node);
  }, [isHrefActive]);

  function renderNested(nodes: SidebarNavItem[]) {
    return (
      <SidebarMenuSub>
        {nodes.map((node) => {
          const hasChildren = !!node.items?.length;
          const Icon = node.icon;
          if (hasChildren) {
            const active = isNodeActive(node);
            return (
              <Collapsible
                key={node.title}
                asChild
                className="group/collapsible"
                defaultOpen={active}
              >
                <SidebarMenuSubItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton isActive={active}>
                      {Icon && <Icon />}
                      <span>{node.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuSubButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {renderNested(node.items!)}
                  </CollapsibleContent>
                </SidebarMenuSubItem>
              </Collapsible>
            );
          }
          const leafActive = isHrefActive(node.url);
          
          return (
            <SidebarMenuSubItem key={node.title}>
              <SidebarMenuSubButton
                asChild
                isActive={leafActive}
                aria-current={leafActive ? "page" : undefined}
              >
                <Link to={node.url || "#"}>
                {Icon && <Icon />}
                  <span>{node.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    );
  }

  function renderTopLevel(nodes: SidebarNavItem[]) {
    return (
      <SidebarMenu>
        {nodes.map((node) => {
          const Icon = node.icon;
          const hasChildren = !!node.items?.length;
          if (hasChildren) {
            const active = isNodeActive(node);
            return (
              <Collapsible
                key={node.title}
                asChild
                className="group/collapsible"
                defaultOpen={active}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={node.title} isActive={active}>
                      {Icon && <Icon />}
                      <span>{node.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {renderNested(node.items!)}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }
          const leafActive = isHrefActive(node.url);
          return (
            <SidebarMenuItem key={node.title}>
              <SidebarMenuButton
                asChild
                tooltip={node.title}
                isActive={leafActive}
                aria-current={leafActive ? "page" : undefined}
              >
                <Link to={node.url || "#"}>
                  {Icon && <Icon />}
                  <span>{node.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    );
  }

  return (
    <SidebarGroup className="flex flex-col gap-3">
      {/* {sidebarGroupLabel && <SidebarGroupLabel>{sidebarGroupLabel}</SidebarGroupLabel>} */}
      {renderTopLevel(navItems)}
    </SidebarGroup>
  );
}

// Helper component to set nav items from pages
export function RenderSidebarNav({
  items,
  sidebarHeader,
  sidebarFooter,
}: {
  items: SidebarNavItem[];
  sidebarHeader?: ReactNode;
  sidebarFooter?: ReactNode;
}) {
  const { setNavItems, setSidebarHeader, setSidebarFooter } = useSidebarNav();

  useEffect(() => {
    setNavItems(items);
    setSidebarHeader(sidebarHeader);
    setSidebarFooter(sidebarFooter);
  }, [
    items,
    sidebarHeader,
    sidebarFooter,
    setNavItems,
    setSidebarHeader,
    setSidebarFooter,
  ]);

  return null;
}

// Helper component to add a single nav item
export function AddSidebarNav({ item }: { item: SidebarNavItem }) {
  const { addNavItem } = useSidebarNav();

  useEffect(() => {
    addNavItem(item);
  }, [item, addNavItem]);

  return null;
}

// import { type ReactNode, useEffect } from "react";
// import { ChevronRight } from "lucide-react";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "../../shadcn/ui/sidebar";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../../shadcn/ui/collapsible";
// // import Link from "next/link";
// import { Link, useLocation } from "react-router";
// import { type SidebarNavItem, useSidebarNav } from "./SidebarNavContext";

// export function NavMain() {
//   const { navItems } = useSidebarNav();
//   const { pathname } = useLocation();

//   // if (!navItems || navItems.length === 0) {
//   //   return null;
//   // }

//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {navItems.map((item) =>
//           item.items && item.items.length > 0 ? (
//             <Collapsible
//               key={item.title}
//               asChild
//               defaultOpen={item.isActive}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items.map((subItem) => (
//                       <SidebarMenuSubItem key={subItem.title}>
//                         <SidebarMenuSubButton asChild isActive={pathname === subItem.url || pathname.startsWith(`${subItem.url}/`)}>
//                           <Link to={subItem.url}>
//                             <span>{subItem.title}</span>
//                           </Link>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               </SidebarMenuItem>
//             </Collapsible>
//           ) : (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)}>
//                 <Link
//                   to={item.url}
//                   className="flex items-center gap-2 w-full"
//                 >
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ),
//         )}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

// // Helper component to set nav items from pages
// export function RenderSidebarNav({
//   items,
//   sidebarHeader,
//   sidebarFooter,
// }: {
//   items: SidebarNavItem[];
//   sidebarHeader?: ReactNode;
//   sidebarFooter?: ReactNode;
// }) {
//   const { setNavItems, setSidebarHeader, setSidebarFooter } = useSidebarNav();

//   useEffect(() => {
//     setNavItems(items);
//     setSidebarHeader(sidebarHeader);
//     setSidebarFooter(sidebarFooter);
//   }, [
//     items,
//     sidebarHeader,
//     sidebarFooter,
//     setNavItems,
//     setSidebarHeader,
//     setSidebarFooter,
//   ]);

//   return null;
// }

// // Helper component to add a single nav item
// export function AddSidebarNav({ item }: { item: SidebarNavItem }) {
//   const { addNavItem } = useSidebarNav();

//   useEffect(() => {
//     addNavItem(item);
//   }, [item, addNavItem]);

//   return null;
// }
