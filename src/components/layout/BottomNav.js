"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuCompass,
  LuPlus,
  LuGift,
  LuUser,
} from "react-icons/lu";

const navItems = [
  { label: "Home", href: "/dashboard", icon: LuLayoutDashboard },
  { label: "Explore", href: "/explore", icon: LuCompass },
  { label: "New", href: "/journey/new", icon: LuPlus, center: true },
  { label: "Rewards", href: "/rewards", icon: LuGift },
  { label: "Profile", href: "/identity", icon: LuUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[var(--color-border)]">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          if (item.center) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center w-12 h-12 -mt-4 rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]"
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[var(--radius-lg)] transition-colors ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
