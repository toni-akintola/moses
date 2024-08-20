import { Icons } from "@/components/ui/icons"
import { NavItem, SidebarNavItem } from "@/utils/types"

export const enterpriseNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/core",
        icon: "dashboard",
        label: "Dashboard",
    },

    {
        title: "Candidates",
        href: "/core/candidates",
        icon: "profile",
        label: "Candidates",
    },
    {
        title: "Jobs",
        href: "/core/search",
        icon: "search",
        label: "Find Jobs",
    },
    {
        title: "Placements",
        href: "/core/placements",
        icon: "target",
        label: "Placements",
    },

    {
        title: "Applications",
        href: "/core/applications",
        icon: "layers",
        label: "Applications",
    },
    {
        title: "Help",
        href: "#",
        icon: "help",
        label: "Help",
    },
]

export const employerNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/core",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Jobs",
        href: "/core/jobs",
        icon: "briefcase",
        label: "Jobs",
    },
    {
        title: "Matches",
        href: "/core/placements",
        icon: "target",
        label: "Placements",
    },
    {
        title: "Applications",
        href: "/core/applications",
        icon: "layers",
        label: "Applications",
    },
    {
        title: "Help",
        href: "#",
        icon: "help",
        label: "Help",
    },
]
