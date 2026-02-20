import { useTheme } from "./utils/theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-4">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("blue-dark")}>Blue</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
