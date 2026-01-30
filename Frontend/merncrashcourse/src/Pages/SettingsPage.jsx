import React from "react";
import { THEMES } from "../constants/index.js";
import { useThemesStore } from "../store/useThemesStore.js";

const SettingsPage = () => {
  const { theme: currentTheme, setTheme } = useThemesStore();
  
  return (
    <div className="container mx-auto max-w-4xl px-4 mt-8 pb-28 md:pb-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">настройки</h1>
        <p className="text-base-content/60">выбери тему которая тебе нравится</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
              currentTheme === theme
                ? "border-primary shadow-lg"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <div
              className="h-20 w-full rounded-md overflow-hidden mb-2"
              data-theme={theme}
            >
              <div className="grid grid-cols-4 gap-1 p-2 h-full">
                <div className="rounded bg-primary" />
                <div className="rounded bg-secondary" />
                <div className="rounded bg-accent" />
                <div className="rounded bg-neutral" />
              </div>
            </div>

            <p className="text-sm font-medium truncate capitalize">
              {theme}
            </p>

            {currentTheme === theme && (
              <div className="absolute top-2 right-2">
                <div className="bg-primary text-primary-content rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
