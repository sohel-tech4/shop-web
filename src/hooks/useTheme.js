import { useEffect, useState } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("nextgen-theme");
      return savedTheme ? savedTheme === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("nextgen-theme", darkMode ? "dark" : "light");
    } catch {}
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
