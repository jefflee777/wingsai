"use client";

import Sidebar from "@/components/layout/Sidebar";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
