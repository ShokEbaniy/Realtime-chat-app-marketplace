import React from "react";
import { THEMES } from "../constants/index.js";
import { set } from "mongoose";
import { useThemesStore } from "../store/useThemesStore.js";

const SettingsPage = () => {
  const { setTheme } = useThemesStore();
  return (
    <div className="grid grid-cols-2 gap-5 mb-5">
      {THEMES.map((theme) => (
        <button key={theme} className="p-6 rounded border">
          <div
            className="relative h-20 w-full rounded-md overflow-hidden"
            data-theme={theme}
            onClick={() => {
              setTheme(theme);
            }}
          >
            <div className="absolute inset-1 grid grid-cols-4 gap-1 p-1">
              <div className="rounded bg-primary" />
              <div className="rounded bg-secondary" />
              <div className="rounded bg-accent" />
              <div className="rounded bg-neutral" />
            </div>
          </div>

          <p className="mt-2 text-sm truncate">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SettingsPage;
