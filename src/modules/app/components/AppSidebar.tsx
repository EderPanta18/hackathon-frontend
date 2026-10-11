// src/modules/app/components/AppSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import type { Role } from "@/core/enums";
import {
    Sidebar,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuSub,
} from "@/ui/navigation/sidebar";
import { navItemsForRole, type AppNavItem } from "../config";

type AppSidebarProps = { role: Role };

function isItemActive(pathname: string, href: string): boolean {
    if (pathname === href) return true;

    return pathname.startsWith(`${href}/`);
}

function hasActiveDescendant(pathname: string, item: AppNavItem): boolean {
    return (
        item.children?.some(
            (child) =>
                isItemActive(pathname, child.href) ||
                hasActiveDescendant(pathname, child),
        ) ?? false
    );
}

export function AppSidebar({ role }: AppSidebarProps) {
    const pathname = usePathname();
    const items = navItemsForRole(role);

    return (
        <Sidebar collapsible="offcanvas" variant="sidebar">
            <Sidebar.Header>
                <div className="flex h-10 items-center gap-2 px-2">
                    <span className="text-sm font-semibold">Piura Innova</span>
                </div>
            </Sidebar.Header>

            <Sidebar.Content>
                <SidebarGroup>
                    <SidebarGroup.Label>Navegación</SidebarGroup.Label>
                    <SidebarGroup.Content>
                        <SidebarMenu>
                            {items.map((item) => {
                                const active =
                                    isItemActive(pathname, item.href) ||
                                    hasActiveDescendant(pathname, item);
                                const Icon = item.Icon;
                                const hasChildren =
                                    (item.children?.length ?? 0) > 0;

                                return (
                                    <Fragment key={item.href}>
                                        <SidebarMenu.Item>
                                            <SidebarMenu.Button
                                                asChild
                                                isActive={active}
                                                tooltip={item.label}
                                            >
                                                <Link href={item.href}>
                                                    <Icon aria-hidden="true" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenu.Button>
                                        </SidebarMenu.Item>

                                        {hasChildren && active && (
                                            <SidebarMenuSub>
                                                {item.children?.map((child) => {
                                                    const childActive =
                                                        isItemActive(
                                                            pathname,
                                                            child.href,
                                                        );

                                                    return (
                                                        <SidebarMenuSub.Item
                                                            key={child.href}
                                                        >
                                                            <SidebarMenuSub.Button
                                                                asChild
                                                                isActive={
                                                                    childActive
                                                                }
                                                            >
                                                                <Link
                                                                    href={
                                                                        child.href
                                                                    }
                                                                >
                                                                    {
                                                                        child.label
                                                                    }
                                                                </Link>
                                                            </SidebarMenuSub.Button>
                                                        </SidebarMenuSub.Item>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup.Content>
                </SidebarGroup>
            </Sidebar.Content>

            <Sidebar.Rail />
        </Sidebar>
    );
}
