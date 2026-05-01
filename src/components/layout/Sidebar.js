"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuCompass,
  LuShield,
  LuGift,
  LuUser,
  LuSquarePen,
  LuTrophy,
  LuPlus,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { useAppStore } from "@/lib/store";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LuLayoutDashboard },
  { label: "Explore", href: "/explore", icon: LuCompass },
  { label: "New Journey", href: "/journey/new", icon: LuPlus },
  { label: "Verify", href: "/verify", icon: LuShield },
  { label: "Rewards", href: "/rewards", icon: LuGift },
  { label: "Identity", href: "/identity", icon: LuUser },
  { label: "Content", href: "/content", icon: LuSquarePen },
  { label: "Leaderboard", href: "/leaderboard", icon: LuTrophy },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 border-r border-[var(--color-border)] bg-white transition-all duration-300 ${
        sidebarOpen ? "w-[240px]" : "w-[72px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
          <Image src="/logo.png" alt="Wings" width={22} height={22} />
        </div>
        {sidebarOpen && (
          <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)] truncate">
            Wings
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)]"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-[var(--color-primary)]" : ""}`} />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-[var(--color-border)]">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full py-2 rounded-[var(--radius-lg)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          {sidebarOpen ? (
            <LuChevronLeft className="w-4 h-4" />
          ) : (
            <LuChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
