"use client";

import { LuBell, LuSearch, LuMenu } from "react-icons/lu";
import { useAppStore } from "@/lib/store";
import ConnectButton from "@/components/web3/ConnectButton";

export default function AppHeader() {
  const { setSidebarOpen, sidebarOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] h-16 flex items-center px-4 lg:px-6">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)] mr-2 cursor-pointer"
      >
        <LuMenu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="hidden sm:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search destinations, journeys..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--color-bg-alt)] border border-transparent rounded-[var(--radius-lg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer">
          <LuBell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
        </button>

        {/* Wallet Connect */}
        <ConnectButton />
      </div>
    </header>
  );
}
