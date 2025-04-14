"use client"
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 hover:text-gray-500 rounded"
    >
      {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}
