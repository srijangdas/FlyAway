"use client";

import { useEffect, useState } from "react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e);

      const dismissed = localStorage.getItem("pwa-dismissed");

      if (!dismissed) {
        setVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function installApp() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="
      fixed bottom-4
      left-4 right-4
      z-50 rounded-3xl
      bg-blue-600
      p-5 text-white
      shadow-xl
    "
    >
      <div
        className="
        flex items-center
        justify-between
      "
      >
        <div>
          <h3 className="font-bold">Install FlyAway</h3>

          <p className="text-sm opacity-90">Get app-like experience.</p>
        </div>

        <button
          onClick={installApp}
          className="
          rounded-xl
          bg-white
          px-4 py-2
          text-blue-600
        "
        >
          Install
        </button>
      </div>
    </div>
  );
}
