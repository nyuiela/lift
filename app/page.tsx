"use client";

import {
  useMiniKit,
  useAddFrame,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./screens/DemoComponents";
import { Icon } from "./screens/DemoComponents";
import { Home } from "./screens/home";
import { Features } from "./screens/DemoComponents";
import { Blocks, CableCar, Cog, CogIcon, HomeIcon, SquarePlus } from "lucide-react";
import { Event } from "./screens/event";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)] w-full">
      <div className="w-full max-w-md mx-auto px-4 py-4 relative">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown className="bg-red-300">
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
          {activeTab === "event" && <Event setActiveTab={setActiveTab} />}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">

          {/* <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button> */}
        </footer>
      </div>
      <div className="w-full bg-red-00 h-15 fixed bottom-0 mx-auto p-0 flex gap-1 border-t-[1px] border-gray-300 px-10">
        <button className="w-full flex-1 bg-blue-00 p-4 flex justify-center items-center" onClick={() => setActiveTab("home")}>
          <CableCar color={activeTab === "home" ? "black" : "#6B7280"} fill=
            // {activeTab === "home" ? "black" : "#6B7280"} 
            {"white"}
            size={28} />
        </button>
        <button className="w-full flex-1 bg-blue-00 p-4 flex justify-center items-center" onClick={() => setActiveTab("event")}>
          <Blocks color={activeTab === "event" ? "black" : "#6B7280"} fill=
            // {activeTab === "event" ? "black" : "#6B7280"}
            {"white"}
            size={28} />

        </button>
        <button className="w-[3rem] h-[3rem] flex-1 bg-blue-00 p-4 flex justify-center items-center relative bottom-5 rounded-full">
          <SquarePlus color={activeTab === "post" ? "black" : "#6B7280"} fill={"white"} size={35} />
        </button>
        <button className="w-full flex-1 bg-blue-00 p-4 flex justify-center items-center">
          <HomeIcon color={activeTab === "event" ? "black" : "#6B7280"} fill={activeTab === "event" ? "black" : "#6B7280"} size={28} />
        </button>
        <button className="w-full flex-1 bg-blue-00 p-4 flex justify-center items-center">
          <CogIcon color={activeTab === "event" ? "black" : "#6B7280"} fill="white" size={28} />
        </button>
      </div>
    </div>
  );
}
