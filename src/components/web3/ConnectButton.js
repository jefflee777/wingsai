"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { LuWallet, LuLogOut, LuCopy, LuCheck, LuChevronDown } from "react-icons/lu";
import { useAppStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export default function ConnectButton({ fullWidth = false }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { setUserProfile } = useAppStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [copied, setCopied] = useState(false);

  // Upsert user to Supabase on connect
  const handleConnect = async (connector) => {
    connect(
      { connector },
      {
        onSuccess: async (data) => {
          const wallet = data.accounts[0];
          if (wallet) {
            try {
              const { data: user, error } = await supabase
                .from("users")
                .upsert(
                  { wallet_address: wallet.toLowerCase(), username: `explorer_${wallet.slice(2, 8)}` },
                  { onConflict: "wallet_address" }
                )
                .select()
                .single();

              if (user) setUserProfile(user);
            } catch (e) {
              console.warn("Supabase upsert skipped:", e);
            }
          }
          setShowWallets(false);
        },
      }
    );
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowWallets(!showWallets)}
          disabled={isPending}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer disabled:opacity-50 ${fullWidth ? "w-full justify-center" : ""}`}
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <LuWallet className="w-4 h-4" />
          )}
          {isPending ? "Connecting..." : "Connect Wallet"}
        </button>

        {/* Wallet selector dropdown */}
        {showWallets && (
          <>
            <div className="fixed inset-0 z-[300]" onClick={() => setShowWallets(false)} />
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-2 z-[301]">
              <p className="px-3 py-2 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                Select Wallet
              </p>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] flex items-center justify-center">
                    <LuWallet className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="text-left">
                    <div>{connector.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {connector.type === "injected" ? "Browser wallet" : "Scan QR code"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-[var(--radius-lg)] text-sm font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
          <LuWallet className="w-3 h-3 text-[var(--color-primary)]" />
        </div>
        <span className="hidden sm:inline">{truncatedAddress}</span>
        {balance && (
          <span className="text-xs text-[var(--color-text-secondary)]">
            {parseFloat(balance.formatted).toFixed(3)} {balance.symbol}
          </span>
        )}
        <LuChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
      </button>

      {/* Account menu */}
      {showMenu && (
        <>
          <div className="fixed inset-0 z-[300]" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-2 z-[301]">
            <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
              <p className="text-xs text-[var(--color-text-muted)]">Connected</p>
              <p className="text-sm font-medium text-[var(--color-text)] font-mono">
                {truncatedAddress}
              </p>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
            >
              {copied ? <LuCheck className="w-4 h-4 text-[var(--color-success)]" /> : <LuCopy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy address"}
            </button>
            <button
              onClick={() => {
                disconnect();
                setShowMenu(false);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-error)] hover:bg-[var(--color-error-light)] transition-colors cursor-pointer"
            >
              <LuLogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </>
      )}
    </div>
  );
}
