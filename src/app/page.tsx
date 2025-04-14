// app/page.tsx
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <ThemeToggle />
      </main>
    </ThemeProvider>
  );
}
