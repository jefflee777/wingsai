import { create } from "zustand";

export const useAppStore = create((set) => ({
  // Sidebar state
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Mobile nav
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

  // Active journey tracking
  activeJourneyId: null,
  setActiveJourneyId: (id) => set({ activeJourneyId: id }),

  // User profile from Supabase (cached client-side)
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),

  // Modals
  verifyModalOpen: false,
  verifyCheckpointId: null,
  openVerifyModal: (checkpointId) =>
    set({ verifyModalOpen: true, verifyCheckpointId: checkpointId }),
  closeVerifyModal: () =>
    set({ verifyModalOpen: false, verifyCheckpointId: null }),

  // AI Companion
  companionOpen: false,
  companionMessages: [],
  toggleCompanion: () => set((s) => ({ companionOpen: !s.companionOpen })),
  addCompanionMessage: (msg) =>
    set((s) => ({ companionMessages: [...s.companionMessages, msg] })),
  clearCompanionMessages: () => set({ companionMessages: [] }),

  // Notifications
  notifications: [],
  addNotification: (notif) =>
    set((s) => ({
      notifications: [
        { id: Date.now(), ...notif },
        ...s.notifications.slice(0, 9),
      ],
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}));
